-- ECHO Supabase Database Schema & pgvector Setup
-- Run this script in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- 1. Enable pgvector Extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 3. Sources Table
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'pdf', 'txt', 'image', 'audio', 'conversation'
  filename TEXT NOT NULL,
  storage_path TEXT,
  messages_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Processed ✓',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  speaker TEXT NOT NULL,
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Chunks Table with Vector Embeddings (384-dim for gte-small / sentence-transformers)
CREATE TABLE IF NOT EXISTS chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  speaker TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  embedding VECTOR(384),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Insights & Signals Table
CREATE TABLE IF NOT EXISTS insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'Risks', 'Commitments', 'Dependencies', 'Decisions', 'Contradictions'
  severity TEXT NOT NULL, -- 'High', 'Medium', 'Info'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  related_people TEXT[],
  related_sources TEXT[],
  status TEXT DEFAULT 'unresolved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create HNSW Vector Index for Instant Semantic Similarity Search
CREATE INDEX IF NOT EXISTS chunks_embedding_hnsw_idx 
ON chunks 
USING hnsw (embedding vector_cosine_ops);

-- 8. RPC Similarity Search Function
CREATE OR REPLACE FUNCTION match_chunks (
  query_embedding VECTOR(384),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  speaker TEXT,
  timestamp TEXT,
  source_id UUID,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    chunks.id,
    chunks.content,
    chunks.speaker,
    chunks.timestamp,
    chunks.source_id,
    1 - (chunks.embedding <=> query_embedding) AS similarity
  FROM chunks
  WHERE 1 - (chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY chunks.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
