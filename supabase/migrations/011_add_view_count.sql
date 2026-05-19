-- DayPic 011 — artists.view_count 컬럼 추가 + 원자적 증가 함수
-- 2026-05-19

-- ============================================================
-- 1. view_count 컬럼 추가
-- ============================================================
ALTER TABLE artists ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0;

-- ============================================================
-- 2. 원자적 증가 함수 생성 (race condition 방지)
-- ============================================================
CREATE OR REPLACE FUNCTION increment_artist_view_count(p_id TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE artists
    SET view_count = view_count + 1
    WHERE id = p_id
    RETURNING view_count INTO new_count;
  RETURN COALESCE(new_count, 0);
END;
$$;

REVOKE ALL ON FUNCTION increment_artist_view_count(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION increment_artist_view_count(text) TO service_role;

-- ============================================================
-- 3. artists_public 뷰 재생성 (view_count 포함)
-- ============================================================
DROP VIEW IF EXISTS artists_public;

CREATE VIEW artists_public
  WITH (security_invoker = on) AS
  SELECT
    id, name, service, region, price, artist_type,
    portfolio, image, portfolio_images, rating,
    style_keywords, open_chat_url,
    view_count,
    created_at, updated_at
  FROM artists;

GRANT SELECT ON artists_public TO anon;
GRANT SELECT ON artists_public TO authenticated;

-- ============================================================
-- 4. 검증
-- ============================================================
SELECT 'view_count column exists?' AS check,
  EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'artists' AND column_name = 'view_count'
  ) AS exists;
-- ↑ true 여야 성공

SELECT 'increment function exists?' AS check,
  EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'increment_artist_view_count'
  ) AS exists;
-- ↑ true 여야 성공
