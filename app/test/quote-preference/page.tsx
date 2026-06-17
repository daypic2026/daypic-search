"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type QuoteDraft = {
  category: string;
  categoryLabel?: string;
  vendorName?: string;
  quoteText?: string;
};

type Option = {
  id: string;
  title: string;
  desc: string;
};

type Combination = {
  id: string;
  title: string;
  desc: string;
  optionIds: string[];
};

const MAX_SELECTED = 5;

const categoryLabels: Record<string, string> = {
  "wedding-snap": "본식스냅",
  "wedding-video": "본식영상",
  "wedding-hall": "웨딩홀",
  dress: "드레스",
  hairmakeup: "헤어메이크업",
  mc: "사회자",
  bouquet: "부케",
  invitation: "청첩장",
  interior: "인테리어",
  travel: "여행",
};

const commonOptions: Option[] = [
  { id: "price", title: "가격", desc: "예산 안에서 합리적인지" },
  { id: "composition", title: "구성", desc: "포함 항목이 충분한지" },
  { id: "review", title: "후기", desc: "실제 이용자 만족도가 좋은지" },
  { id: "trust", title: "신뢰도", desc: "믿고 맡길 수 있는 업체인지" },
  { id: "extra-cost", title: "추가비용 없음", desc: "숨은 비용 가능성이 낮은지" },
  { id: "contract", title: "계약 조건", desc: "취소, 변경, 환불 조건이 명확한지" },
  { id: "communication", title: "상담 응대", desc: "문의 응답과 안내가 친절한지" },
  { id: "schedule", title: "일정 안정성", desc: "원하는 일정에 맞출 수 있는지" },
];

const categoryOptions: Record<string, Option[]> = {
  "wedding-snap": [
    { id: "photo-quality", title: "결과물 퀄리티", desc: "사진 색감, 구도, 감정 표현" },
    { id: "photographer", title: "작가 지정", desc: "실제 촬영자가 명확한지" },
    { id: "original-count", title: "원본 제공", desc: "원본 수량과 전달 방식" },
    { id: "retouch-count", title: "보정본 수량", desc: "보정본 개수와 수정 가능 여부" },
    { id: "delivery-time", title: "전달기간", desc: "원본과 보정본을 받는 속도" },
    { id: "album", title: "앨범 포함", desc: "앨범 구성과 추가 비용 여부" },
    { id: "backup", title: "백업 안정성", desc: "데이터 보관과 분실 방지" },
    { id: "hall-experience", title: "홀 경험", desc: "내 예식장 촬영 경험이 있는지" },
    { id: "same-day", title: "당일 진행 안정감", desc: "예식 흐름을 방해하지 않는지" },
    { id: "second-shooter", title: "2인 촬영", desc: "메인·서브 작가 구성 여부" },
    { id: "raw-delivery", title: "원본 빠른 전달", desc: "원본을 빠르게 받을 수 있는지" },
    { id: "skin-tone", title: "피부톤 보정", desc: "과하지 않고 자연스러운 보정" },
    { id: "parent-photo", title: "부모님 사진", desc: "가족과 부모님 사진을 잘 담는지" },
    { id: "ceremony-flow", title: "예식 흐름 이해", desc: "순간을 놓치지 않는 진행력" },
    { id: "portfolio-fit", title: "포트폴리오 취향", desc: "내가 원하는 분위기와 맞는지" },
  ],

  "wedding-video": [
    { id: "video-quality", title: "영상 퀄리티", desc: "색감, 편집, 감정 전달" },
    { id: "highlight", title: "하이라이트 영상", desc: "짧게 보기 좋은 영상 포함 여부" },
    { id: "full-video", title: "풀영상 제공", desc: "전체 예식 영상 제공 여부" },
    { id: "audio", title: "음향 품질", desc: "축사와 혼인서약 음성 품질" },
    { id: "cinematic", title: "연출감", desc: "영화 같은 분위기와 편집 스타일" },
    { id: "delivery-time", title: "전달기간", desc: "최종 영상 전달 속도" },
    { id: "usb", title: "USB 포함", desc: "USB, 링크, 파일 전달 방식" },
    { id: "backup", title: "백업 안정성", desc: "촬영 데이터 보관 안정성" },
    { id: "camera-count", title: "카메라 대수", desc: "다각도 촬영 가능 여부" },
    { id: "mic", title: "마이크 사용", desc: "음성 녹음 장비 사용 여부" },
    { id: "drone", title: "드론 촬영", desc: "야외·홀 외부 연출 가능 여부" },
    { id: "teaser", title: "티저 영상", desc: "짧은 선공개 영상 제공 여부" },
    { id: "music", title: "음악 선택", desc: "영상 분위기에 맞는 음악 사용" },
    { id: "edit-style", title: "편집 스타일", desc: "감성형, 기록형, 영화형 등" },
    { id: "parent-moment", title: "부모님 장면", desc: "부모님과 가족 순간을 잘 담는지" },
  ],

  "wedding-hall": [
    { id: "meal-price", title: "식대", desc: "1인 식대와 음료 포함 여부" },
    { id: "guarantee", title: "보증인원", desc: "최소 보증 인원 부담" },
    { id: "rental-fee", title: "대관료", desc: "홀 사용료와 포함 조건" },
    { id: "flower", title: "꽃장식", desc: "생화, 조화, 기본 장식 범위" },
    { id: "parking", title: "주차", desc: "주차 대수와 하객 편의성" },
    { id: "location", title: "위치", desc: "교통과 접근성" },
    { id: "food", title: "음식", desc: "하객 만족도에 큰 영향" },
    { id: "time-slot", title: "예식 시간", desc: "원하는 시간대 가능 여부" },
    { id: "bridal-room", title: "신부대기실", desc: "공간, 조명, 사진 분위기" },
    { id: "mandatory-option", title: "필수 옵션", desc: "음향, 연출, 장식 필수 비용" },
    { id: "hall-mood", title: "홀 분위기", desc: "어두운 홀, 밝은 홀, 채플형 등" },
    { id: "guest-flow", title: "하객 동선", desc: "접수, 식장, 식사 이동 편의성" },
    { id: "private-wedding", title: "단독홀 여부", desc: "다른 예식과 동선이 겹치지 않는지" },
    { id: "meal-style", title: "식사 방식", desc: "뷔페, 코스, 한상차림 등" },
    { id: "photo-zone", title: "사진 공간", desc: "로비, 포토테이블, 계단 등 촬영 포인트" },
  ],

  dress: [
    { id: "dress-quality", title: "드레스 퀄리티", desc: "소재, 라인, 사진 완성도" },
    { id: "lineup", title: "드레스 라인업", desc: "선택 가능한 드레스 폭" },
    { id: "premium-fee", title: "추가금", desc: "프리미엄 라인 추가 비용" },
    { id: "fitting-count", title: "피팅 횟수", desc: "피팅 가능 횟수와 비용" },
    { id: "change", title: "변경 가능성", desc: "드레스 변경 조건" },
    { id: "helper-fee", title: "헬퍼비", desc: "본식 당일 헬퍼 비용" },
    { id: "manager", title: "담당자", desc: "상담과 추천의 안정감" },
    { id: "brand", title: "브랜드", desc: "샵 인지도와 드레스 이미지" },
    { id: "photo-fit", title: "사진 잘 받는지", desc: "촬영 결과에서의 완성도" },
    { id: "body-fit", title: "체형 보완", desc: "내 체형에 잘 맞는 라인" },
    { id: "new-dress", title: "신상 드레스", desc: "최근 입고 라인 선택 가능 여부" },
    { id: "black-label", title: "프리미엄 라인", desc: "블랙라벨, 수입드레스 등" },
    { id: "accessory", title: "소품 포함", desc: "베일, 티아라, 장갑 포함 여부" },
    { id: "second-dress", title: "2부 드레스", desc: "2부 드레스 포함 또는 추가비" },
    { id: "clean-condition", title: "드레스 컨디션", desc: "오염, 마모, 관리 상태" },
  ],

  hairmakeup: [
    { id: "artist-level", title: "담당자 실력", desc: "원장, 실장, 디자이너 지정 여부" },
    { id: "style-fit", title: "스타일 완성도", desc: "내 얼굴형과 분위기에 맞는지" },
    { id: "morning-fee", title: "새벽 비용", desc: "이른 시간 추가 비용" },
    { id: "travel-fee", title: "출장비", desc: "출장 가능 여부와 비용" },
    { id: "trial", title: "리허설 포함", desc: "사전 테스트 가능 여부" },
    { id: "parents", title: "혼주 메이크업", desc: "부모님 메이크업 포함 여부" },
    { id: "touch-up", title: "수정 메이크업", desc: "본식 중 수정 가능 여부" },
    { id: "hair-change", title: "헤어 변경", desc: "2부 헤어 변경 가능 여부" },
    { id: "time-stability", title: "시간 안정성", desc: "당일 지연 없이 진행되는지" },
    { id: "natural", title: "자연스러움", desc: "과하지 않고 어울리는 스타일" },
    { id: "skin-expression", title: "피부 표현", desc: "두껍지 않고 오래가는 베이스" },
    { id: "makeup-lasting", title: "지속력", desc: "눈물, 조명, 긴 예식에도 유지되는지" },
    { id: "groom", title: "신랑 메이크업", desc: "신랑 헤어·메이크업 포함 여부" },
    { id: "shop-location", title: "샵 위치", desc: "예식장 이동 동선이 편한지" },
    { id: "early-start", title: "이른 시작 가능", desc: "오전 예식 대응 가능 여부" },
  ],

  mc: [
    { id: "stability", title: "진행 안정감", desc: "식순을 매끄럽게 이끄는지" },
    { id: "voice", title: "목소리·분위기", desc: "예식 분위기와 잘 맞는지" },
    { id: "experience", title: "경험", desc: "다양한 예식 진행 경험" },
    { id: "coordination", title: "식순 조율", desc: "예식 전 커뮤니케이션" },
    { id: "issue", title: "돌발상황 대응", desc: "현장 변수에 강한지" },
    { id: "script", title: "대본 완성도", desc: "어색하지 않은 멘트 구성" },
    { id: "ceremony-tone", title: "예식 톤", desc: "차분함, 유쾌함 등 분위기" },
    { id: "rehearsal", title: "리허설 진행", desc: "본식 전 동선과 식순 확인" },
    { id: "professional", title: "전문성", desc: "현장 진행자로서의 숙련도" },
    { id: "custom-script", title: "맞춤 멘트", desc: "신랑신부 이야기 반영 여부" },
    { id: "timing", title: "타이밍", desc: "입장, 퇴장, 이벤트 타이밍 조율" },
    { id: "calm", title: "차분한 진행", desc: "과하지 않고 품격 있는 진행" },
    { id: "fun", title: "유쾌한 진행", desc: "밝고 자연스러운 분위기" },
    { id: "ceremony-knowledge", title: "예식 이해도", desc: "홀, 식순, 음향과의 협업 이해" },
    { id: "appearance", title: "단정한 이미지", desc: "예식 분위기와 어울리는 인상" },
  ],

  bouquet: [
    { id: "flower-quality", title: "꽃 퀄리티", desc: "생화 상태와 풍성함" },
    { id: "color", title: "색감", desc: "드레스와 예식 분위기와의 조화" },
    { id: "design", title: "디자인", desc: "원하는 부케 스타일 구현" },
    { id: "season", title: "계절꽃 가능", desc: "계절에 맞는 꽃 구성" },
    { id: "boutonniere", title: "부토니에 포함", desc: "신랑 부토니에 포함 여부" },
    { id: "corsage", title: "코사지 포함", desc: "혼주 코사지 포함 여부" },
    { id: "delivery", title: "배송·픽업", desc: "당일 수령 안정성" },
    { id: "freshness", title: "신선도", desc: "시들지 않고 오래 유지되는지" },
    { id: "photo-fit", title: "사진 분위기", desc: "사진에서 예쁘게 보이는지" },
    { id: "custom", title: "맞춤 제작", desc: "원하는 컬러와 형태 반영 여부" },
    { id: "size", title: "부케 크기", desc: "체형과 드레스에 어울리는 크기" },
    { id: "ribbon", title: "리본 디테일", desc: "리본 색상과 길이, 마감" },
    { id: "sub-bouquet", title: "던지는 부케", desc: "던지는 부케 별도 구성 여부" },
    { id: "flower-type", title: "꽃 종류", desc: "작약, 장미, 튤립 등 선호 꽃 사용" },
    { id: "mood-fit", title: "예식 분위기", desc: "홀과 전체 스타일링에 어울리는지" },
  ],

  invitation: [
    { id: "design", title: "디자인", desc: "우리 예식 분위기와 잘 맞는지" },
    { id: "unit-price", title: "수량별 단가", desc: "장수별 가격 차이" },
    { id: "print-quality", title: "인쇄 퀄리티", desc: "종이, 색감, 마감 완성도" },
    { id: "paper", title: "종이 재질", desc: "두께와 고급스러운 느낌" },
    { id: "envelope", title: "봉투 포함", desc: "봉투와 스티커 포함 여부" },
    { id: "mobile", title: "모바일 청첩장", desc: "모바일 버전 제공 여부" },
    { id: "revision", title: "수정 가능", desc: "문구와 디자인 수정 횟수" },
    { id: "delivery", title: "제작·배송기간", desc: "일정에 맞게 받을 수 있는지" },
    { id: "sample", title: "샘플 확인", desc: "실물 샘플 확인 가능 여부" },
    { id: "customer-service", title: "고객 응대", desc: "수정 요청 대응 속도" },
    { id: "map", title: "약도·안내", desc: "예식장 위치 안내 구성" },
    { id: "ticket", title: "식권 포함", desc: "식권 디자인과 수량 포함 여부" },
    { id: "photo", title: "사진 사용", desc: "사진형 청첩장 제작 가능 여부" },
    { id: "template", title: "템플릿 다양성", desc: "선택 가능한 디자인 폭" },
    { id: "premium-finish", title: "후가공", desc: "박, 형압, 금박 등 고급 마감" },
  ],

  interior: [
    { id: "total-budget", title: "총 예산", desc: "자재, 시공, 옵션 포함 금액" },
    { id: "construction-quality", title: "시공 퀄리티", desc: "마감과 실제 완성도" },
    { id: "material", title: "자재 등급", desc: "사용 자재의 품질과 브랜드" },
    { id: "schedule", title: "시공 일정", desc: "입주 일정에 맞출 수 있는지" },
    { id: "as", title: "하자보수", desc: "A/S 기간과 대응 방식" },
    { id: "design-fit", title: "디자인 취향", desc: "원하는 분위기 구현 가능 여부" },
    { id: "extra-work", title: "추가 공사 가능성", desc: "공사 중 비용 증가 가능성" },
    { id: "portfolio", title: "시공 사례", desc: "비슷한 구조의 실제 사례" },
    { id: "warranty", title: "보증 조건", desc: "계약서와 보증 범위" },
    { id: "estimate-detail", title: "견적 상세도", desc: "항목별 비용이 투명한지" },
    { id: "site-manager", title: "현장 관리", desc: "현장 소통과 일정 관리" },
    { id: "space-efficiency", title: "공간 활용", desc: "수납과 동선이 효율적인지" },
    { id: "lighting", title: "조명 계획", desc: "분위기와 실용성을 모두 고려하는지" },
    { id: "cleaning", title: "마감 청소", desc: "시공 후 정리와 청소 포함 여부" },
    { id: "payment", title: "결제 조건", desc: "계약금, 중도금, 잔금 조건" },
  ],

  travel: [
    { id: "total-cost", title: "총 여행 비용", desc: "항공, 숙소, 일정 포함 비용" },
    { id: "hotel", title: "숙소 퀄리티", desc: "위치, 컨디션, 만족도" },
    { id: "flight", title: "항공 일정", desc: "출도착 시간과 경유 여부" },
    { id: "schedule", title: "일정 구성", desc: "자유시간과 투어 균형" },
    { id: "included", title: "포함 항목", desc: "식사, 이동, 투어 포함 여부" },
    { id: "option-tour", title: "선택 관광", desc: "현지 추가 결제 가능성" },
    { id: "guide", title: "가이드", desc: "가이드 포함 여부와 만족도" },
    { id: "location", title: "동선", desc: "이동 시간이 과하지 않은지" },
    { id: "honeymoon-mood", title: "신혼여행 분위기", desc: "휴양, 관광, 프라이빗함" },
    { id: "cancel", title: "취소 조건", desc: "변경과 환불 조건" },
    { id: "resort-benefit", title: "리조트 혜택", desc: "조식, 스파, 허니문 특전" },
    { id: "room-type", title: "객실 타입", desc: "오션뷰, 풀빌라, 스위트 등" },
    { id: "safety", title: "안전성", desc: "지역 치안과 여행사 대응" },
    { id: "free-time", title: "자유시간", desc: "둘만의 시간을 충분히 가질 수 있는지" },
    { id: "weather-season", title: "여행 시기", desc: "날씨와 성수기 여부" },
  ],
};

const recommendedCombinations: Record<string, Combination[]> = {
  "wedding-snap": [
    { id: "quality-first", title: "결과물 우선형", desc: "사진 퀄리티와 작가 실력을 가장 중요하게 볼 때", optionIds: ["photo-quality", "photographer", "portfolio-fit", "skin-tone", "review"] },
    { id: "safe-first", title: "안정감 우선형", desc: "당일 진행과 데이터 백업까지 안전하게 보고 싶을 때", optionIds: ["trust", "backup", "same-day", "hall-experience", "contract"] },
    { id: "cost-first", title: "가성비 우선형", desc: "예산 안에서 구성과 추가비용을 꼼꼼히 볼 때", optionIds: ["price", "composition", "extra-cost", "retouch-count", "album"] },
    { id: "family-first", title: "가족사진 우선형", desc: "부모님과 가족 순간을 잘 남기고 싶을 때", optionIds: ["parent-photo", "ceremony-flow", "photo-quality", "photographer", "review"] },
    { id: "fast-first", title: "빠른 전달형", desc: "원본과 보정본을 빨리 받고 싶을 때", optionIds: ["delivery-time", "raw-delivery", "communication", "original-count", "contract"] },
  ],

  "wedding-video": [
    { id: "cinematic-first", title: "영화감성 우선형", desc: "감성적인 편집과 영상미를 중요하게 볼 때", optionIds: ["video-quality", "cinematic", "edit-style", "music", "highlight"] },
    { id: "record-first", title: "기록 우선형", desc: "예식 전체를 빠짐없이 남기고 싶을 때", optionIds: ["full-video", "camera-count", "audio", "parent-moment", "backup"] },
    { id: "cost-first", title: "가성비 우선형", desc: "가격과 포함 구성을 균형 있게 보고 싶을 때", optionIds: ["price", "composition", "extra-cost", "usb", "delivery-time"] },
    { id: "audio-first", title: "음성 기록형", desc: "축사, 혼인서약, 부모님 음성을 잘 남기고 싶을 때", optionIds: ["audio", "mic", "full-video", "parent-moment", "backup"] },
    { id: "fast-first", title: "빠른 전달형", desc: "영상 결과물을 빨리 받고 싶을 때", optionIds: ["delivery-time", "teaser", "communication", "highlight", "contract"] },
  ],

  "wedding-hall": [
    { id: "budget-first", title: "예산 관리형", desc: "식대와 보증인원 부담을 줄이고 싶을 때", optionIds: ["meal-price", "guarantee", "rental-fee", "mandatory-option", "contract"] },
    { id: "guest-first", title: "하객 만족형", desc: "음식, 주차, 동선을 중요하게 볼 때", optionIds: ["food", "parking", "location", "guest-flow", "meal-style"] },
    { id: "mood-first", title: "공간 분위기형", desc: "홀 분위기와 사진 공간을 중요하게 볼 때", optionIds: ["hall-mood", "bridal-room", "flower", "photo-zone", "private-wedding"] },
    { id: "convenience-first", title: "동선 편의형", desc: "하객 이동과 예식 진행 편의성을 볼 때", optionIds: ["location", "parking", "guest-flow", "private-wedding", "time-slot"] },
    { id: "contract-first", title: "계약 안정형", desc: "취소, 변경, 필수 옵션 조건을 꼼꼼히 볼 때", optionIds: ["contract", "guarantee", "mandatory-option", "extra-cost", "schedule"] },
  ],

  dress: [
    { id: "premium-first", title: "드레스 퀄리티형", desc: "드레스 자체의 완성도를 가장 중요하게 볼 때", optionIds: ["dress-quality", "lineup", "brand", "black-label", "clean-condition"] },
    { id: "fit-first", title: "체형 보완형", desc: "내 체형에 잘 맞고 사진이 잘 나오는지를 볼 때", optionIds: ["body-fit", "photo-fit", "manager", "fitting-count", "change"] },
    { id: "cost-first", title: "추가금 방어형", desc: "프리미엄 추가금과 헬퍼비를 줄이고 싶을 때", optionIds: ["price", "premium-fee", "helper-fee", "extra-cost", "second-dress"] },
    { id: "choice-first", title: "선택 폭 우선형", desc: "피팅과 변경 가능성을 중요하게 볼 때", optionIds: ["lineup", "fitting-count", "change", "new-dress", "manager"] },
    { id: "photo-first", title: "사진 완성형", desc: "본식 사진에서 예쁘게 보이는지를 중점으로 볼 때", optionIds: ["photo-fit", "dress-quality", "accessory", "body-fit", "brand"] },
  ],

  hairmakeup: [
    { id: "natural-first", title: "자연스러운 스타일형", desc: "과하지 않고 나에게 어울리는 스타일을 원할 때", optionIds: ["natural", "style-fit", "skin-expression", "artist-level", "review"] },
    { id: "lasting-first", title: "지속력 우선형", desc: "눈물, 조명, 긴 예식에도 무너지지 않는 걸 볼 때", optionIds: ["makeup-lasting", "skin-expression", "touch-up", "time-stability", "artist-level"] },
    { id: "cost-first", title: "추가금 방어형", desc: "새벽비, 출장비, 혼주 비용을 꼼꼼히 볼 때", optionIds: ["price", "morning-fee", "travel-fee", "parents", "extra-cost"] },
    { id: "family-first", title: "가족 포함형", desc: "혼주와 신랑 스타일링까지 함께 볼 때", optionIds: ["parents", "groom", "time-stability", "shop-location", "composition"] },
    { id: "schedule-first", title: "당일 안정형", desc: "시간 지연 없이 안정적으로 진행되는지를 볼 때", optionIds: ["time-stability", "early-start", "shop-location", "communication", "contract"] },
  ],

  mc: [
    { id: "stable-first", title: "안정 진행형", desc: "예식을 매끄럽고 안정적으로 이끌어주길 원할 때", optionIds: ["stability", "experience", "coordination", "issue", "professional"] },
    { id: "calm-first", title: "품격 있는 진행형", desc: "차분하고 과하지 않은 분위기를 원할 때", optionIds: ["calm", "voice", "script", "appearance", "ceremony-tone"] },
    { id: "fun-first", title: "밝은 분위기형", desc: "유쾌하고 자연스러운 예식을 원할 때", optionIds: ["fun", "voice", "custom-script", "timing", "review"] },
    { id: "custom-first", title: "맞춤 진행형", desc: "신랑신부 이야기가 담긴 진행을 원할 때", optionIds: ["custom-script", "communication", "script", "coordination", "rehearsal"] },
    { id: "cost-first", title: "가성비 진행형", desc: "가격과 진행 퀄리티의 균형을 볼 때", optionIds: ["price", "experience", "review", "stability", "contract"] },
  ],

  bouquet: [
    { id: "mood-first", title: "분위기 완성형", desc: "드레스와 홀 분위기에 잘 어울리는지를 볼 때", optionIds: ["color", "design", "mood-fit", "photo-fit", "custom"] },
    { id: "flower-first", title: "꽃 퀄리티형", desc: "생화 상태와 풍성함을 중요하게 볼 때", optionIds: ["flower-quality", "freshness", "flower-type", "season", "size"] },
    { id: "detail-first", title: "디테일 구성형", desc: "부토니에, 코사지, 리본까지 꼼꼼히 볼 때", optionIds: ["boutonniere", "corsage", "ribbon", "sub-bouquet", "composition"] },
    { id: "safe-first", title: "당일 수령 안정형", desc: "배송과 픽업 안정성이 중요한 경우", optionIds: ["delivery", "freshness", "communication", "contract", "review"] },
    { id: "cost-first", title: "예산 균형형", desc: "가격과 구성의 균형을 보고 싶을 때", optionIds: ["price", "composition", "extra-cost", "boutonniere", "corsage"] },
  ],

  invitation: [
    { id: "design-first", title: "디자인 우선형", desc: "청첩장의 첫인상과 분위기를 중요하게 볼 때", optionIds: ["design", "template", "paper", "premium-finish", "photo"] },
    { id: "cost-first", title: "수량 가성비형", desc: "수량별 단가와 포함 구성을 꼼꼼히 볼 때", optionIds: ["unit-price", "composition", "envelope", "ticket", "extra-cost"] },
    { id: "quality-first", title: "인쇄 퀄리티형", desc: "종이, 색감, 마감 완성도를 중요하게 볼 때", optionIds: ["print-quality", "paper", "premium-finish", "sample", "review"] },
    { id: "fast-first", title: "빠른 제작형", desc: "수정과 배송 일정을 안정적으로 맞춰야 할 때", optionIds: ["delivery", "revision", "customer-service", "sample", "contract"] },
    { id: "online-first", title: "모바일 중심형", desc: "모바일 청첩장과 안내 기능을 중요하게 볼 때", optionIds: ["mobile", "map", "design", "revision", "customer-service"] },
  ],

  interior: [
    { id: "budget-first", title: "예산 관리형", desc: "총예산과 추가공사 가능성을 줄이고 싶을 때", optionIds: ["total-budget", "estimate-detail", "extra-work", "payment", "contract"] },
    { id: "quality-first", title: "시공 퀄리티형", desc: "마감과 자재 품질을 중요하게 볼 때", optionIds: ["construction-quality", "material", "portfolio", "site-manager", "as"] },
    { id: "design-first", title: "디자인 취향형", desc: "원하는 분위기와 공간 활용을 중요하게 볼 때", optionIds: ["design-fit", "space-efficiency", "lighting", "portfolio", "communication"] },
    { id: "schedule-first", title: "입주 일정형", desc: "정해진 날짜에 맞춰 끝나는 게 중요할 때", optionIds: ["schedule", "site-manager", "communication", "cleaning", "contract"] },
    { id: "safe-first", title: "하자보수 안정형", desc: "A/S와 보증 조건을 꼼꼼히 보고 싶을 때", optionIds: ["as", "warranty", "contract", "review", "trust"] },
  ],

  travel: [
    { id: "rest-first", title: "휴양 우선형", desc: "편하게 쉬고 프라이빗한 시간을 원할 때", optionIds: ["hotel", "room-type", "honeymoon-mood", "free-time", "resort-benefit"] },
    { id: "cost-first", title: "예산 균형형", desc: "총비용과 포함 항목을 꼼꼼히 볼 때", optionIds: ["total-cost", "included", "option-tour", "extra-cost", "cancel"] },
    { id: "schedule-first", title: "일정 효율형", desc: "항공, 동선, 자유시간 균형을 볼 때", optionIds: ["flight", "schedule", "location", "free-time", "weather-season"] },
    { id: "luxury-first", title: "프리미엄 허니문형", desc: "숙소와 리조트 혜택을 중요하게 볼 때", optionIds: ["hotel", "room-type", "resort-benefit", "honeymoon-mood", "review"] },
    { id: "safe-first", title: "안전한 여행형", desc: "취소 조건과 현지 대응이 중요한 경우", optionIds: ["safety", "guide", "cancel", "review", "contract"] },
  ],
};

export default function QuotePreferencePage() {
  const router = useRouter();

  const [draft, setDraft] = useState<QuoteDraft | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedComboId, setSelectedComboId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("quoteDraft");

    if (saved) {
      setDraft(JSON.parse(saved));
    }
  }, []);

  const category = draft?.category || "wedding-snap";

  const categoryLabel =
    draft?.categoryLabel || categoryLabels[category] || "견적";

  const options = useMemo(() => {
    const customOptions =
      categoryOptions[category] || categoryOptions["wedding-snap"];
    return [...commonOptions, ...customOptions];
  }, [category]);

  const combinations = useMemo(() => {
    return (
      recommendedCombinations[category] ||
      recommendedCombinations["wedding-snap"]
    );
  }, [category]);

  const canProceed = selected.length > 0;

  const toggleOption = (id: string) => {
    setSelectedComboId(null);

    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      if (prev.length >= MAX_SELECTED) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const applyCombination = (combo: Combination) => {
    setSelected(combo.optionIds.slice(0, MAX_SELECTED));
    setSelectedComboId(combo.id);
  };

  const getRank = (id: string) => {
    const index = selected.indexOf(id);
    return index === -1 ? null : index + 1;
  };

  const handleNext = () => {
    if (!canProceed) return;

    const selectedOptions = selected.map((id, index) => {
      const option = options.find((item) => item.id === id);

      return {
        id,
        title: option?.title || id,
        desc: option?.desc || "",
        rank: index + 1,
      };
    });

    const selectedCombination = combinations.find(
      (combo) => combo.id === selectedComboId
    );

    localStorage.setItem(
      "quotePreference",
      JSON.stringify({
        category,
        categoryLabel,
        combination: selectedCombination
          ? {
              id: selectedCombination.id,
              title: selectedCombination.title,
              desc: selectedCombination.desc,
            }
          : null,
        preferences: selectedOptions,
      })
    );

    router.push("/test/quote-result");
  };

  return (
    <main className="min-h-screen bg-[#fdfcff] text-[#222237]">
      <div className="mx-auto min-h-screen max-w-5xl px-5 pb-52 pt-5 sm:px-8 lg:px-10">
        <section className="relative overflow-hidden rounded-[30px] bg-white px-6 py-7 shadow-sm ring-1 ring-[#ece8f0] sm:px-10 sm:py-10">
          <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-[#f4e8f0]" />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/test"
                className="inline-flex rounded-full bg-[#f7edf3] px-4 py-2 text-xs font-extrabold text-[#c46b8d] ring-1 ring-[#efe1e8]"
              >
                DayPic 2.0
              </Link>

              <Link
                href="/test/quote-box"
                className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold text-[#c46b8d] shadow-sm ring-1 ring-[#efe1e8]"
              >
                내 견적함 ›
              </Link>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="text-sm font-black text-[#c46b8d]">
                {categoryLabel} 선택 기준
              </p>

              <h1 className="mt-3 text-[28px] font-black leading-[1.22] tracking-[-0.055em] sm:text-[42px]">
                선택할 때
                <br />
                <span className="text-[#c46b8d]">무엇을 중요하게 볼지</span>
                <br />
                알려주세요
              </h1>

              <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#6d6876] sm:text-[16px] sm:leading-7">
                추천 조합을 선택하거나 직접 최대 5개까지 고를 수 있어요.
                선택한 순서는 결과 추천과 업체 인사이트에 반영돼요.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-[#222237] p-5 text-white shadow-sm sm:p-7">
          <p className="text-sm font-black text-[#e5a9bf]">현재 분석 업종</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">
            {categoryLabel}
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            최대 5개까지 선택할 수 있어요. 선택한 순서대로 1순위부터
            5순위까지 저장돼요.
          </p>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-[#c46b8d] tracking-[-0.04em]">
              추천 조합
            </h2>

            <span className="rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-black text-[#c46b8d]">
              빠른 선택
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {combinations.map((combo) => {
              const isSelected = selectedComboId === combo.id;

              return (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => applyCombination(combo)}
                  className={`rounded-[22px] border p-4 text-left transition active:scale-[0.98] ${
                    isSelected
                      ? "border-[#c46b8d] bg-[#f8eef2]"
                      : "border-[#ece8f0] bg-[#fdfcff]"
                  }`}
                >
                  <p className="text-[15px] font-black text-[#222237]">
                    {combo.title}
                  </p>
                  <p className="mt-2 text-xs font-bold leading-5 text-[#6d6876]">
                    {combo.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-5 rounded-[30px] bg-white p-5 shadow-sm ring-1 ring-[#ece8f0] sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-[-0.04em]">
              직접 선택하기
            </h2>

            <span className="rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-black text-[#c46b8d]">
              {selected.length} / {MAX_SELECTED}
            </span>
          </div>

          <div className="mt-4 rounded-[20px] bg-[#fdfcff] p-4 ring-1 ring-[#ece8f0]">
            <p className="text-sm font-black text-[#c46b8d]">
              공통 기준 + {categoryLabel} 전용 기준
            </p>
            <p className="mt-1 text-xs font-bold leading-5 text-[#6d6876]">
              추천 조합을 고른 뒤 세부 기준을 바꿔도 돼요.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((option) => {
              const rank = getRank(option.id);
              const isSelected = rank !== null;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleOption(option.id)}
                  className={`relative rounded-[22px] border p-4 text-left transition active:scale-[0.98] ${
                    isSelected
                      ? "border-[#c46b8d] bg-[#f8eef2]"
                      : "border-[#ece8f0] bg-[#fdfcff]"
                  }`}
                >
                  {rank && (
                    <div className="absolute right-4 top-4 rounded-full bg-[#c46b8d] px-3 py-1 text-xs font-black text-white">
                      {rank}순위
                    </div>
                  )}

                  <p className="pr-16 text-[15px] font-black text-[#222237]">
                    {option.title}
                  </p>
                  <p className="mt-2 text-xs font-bold leading-5 text-[#6d6876]">
                    {option.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <div className="fixed bottom-[74px] left-0 right-0 z-40 bg-gradient-to-t from-[#fdfcff] via-[#fdfcff] to-transparent px-5 pb-4 pt-8">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex h-[56px] w-full items-center justify-center rounded-[22px] text-[15px] font-black transition active:scale-[0.98] ${
              canProceed
                ? "bg-[#c46b8d] text-white shadow-lg shadow-[#c46b8d]/25"
                : "bg-[#f1e6eb] text-[#a99ba4]"
            }`}
          >
            선택 기준 반영하기
          </button>
        </div>
      </div>
    </main>
  );
}