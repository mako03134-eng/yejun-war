export const WALLET = { // 지갑 레벨: 최대치 / 초당 수입
  levels: [ {max:500,rate:8},{max:800,rate:12},{max:1200,rate:16},{max:1800,rate:22},{max:2600,rate:30},{max:4000,rate:40} ],
  costs: [60, 150, 300, 600, 1200], // 강화 비용
};
export const CANNON = { chargeTime: 45, atk: 300 };

/* ============ 아군 타워 (레이저 눈 캐릭터 스킨) ============
   아군 성에만 적용 — 적 성은 기존 성 그대로.
   range / atk / interval: 레이저 성능
   height: 화면상 이미지 높이(px)
   eyeH:  눈(발사점) 높이 — 발바닥 기준 비율(0~1). 레이저 나오는 위치가 눈이 아니면 이걸 조절
   img: 평시 모습 / imgFire: 발사 시 0.28초간 스왑되는 이미지
   pixel: true면 픽셀아트 크리스프 렌더링
   이미지가 없으면 기존 성 + 창문에서 레이저 발사 */
export const TOWER = {
  range: 300, atk: 45, interval: 2.5,
  height: 110, eyeH: .72,
  img: 'player.png', imgFire: 'player_fire.png',
  pixel: false,
};
