-- artists.kakao_id UNIQUE 제약 추가
-- 배경: register_artist RPC에 ON CONFLICT가 없고 UNIQUE 제약도 없어서
--       동일 카카오 계정으로 중복 등록이 가능했음.
--       중복 레코드를 정리한 후 이 마이그레이션을 실행한다.

ALTER TABLE artists
  ADD CONSTRAINT artists_kakao_id_unique UNIQUE (kakao_id);
