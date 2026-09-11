/* ============ 고양이 명단 ============
   추가: ① assets/cats/ 에 이미지  ② 아래에 한 줄  ③ 새로고침(F5)
      제거: 해당 줄 삭제
         - img 생략/파일 없음 → 임시 캔버스 드로잉으로 표시(아트 없이 밸런스 테스트 가능)
            - 버튼·단축키·스폰이 전부 이 배열 기준으로 자동 생성됨

               필수:  id, name, cost, cd, hp, atk, range, windup, backswing, speed, kb
                  선택:  img(이미지 파일명), size(기본 1, 화면 키=48×size), color(사망 파티클),
                            icon(버튼 임시 이모지), desc, aoe(광역 공격 반경)
                            */
                            export const CATS = [
                              { id:'basic',  img:'basic.png',  icon:'🐱', name:'기본 고양이', cost:50,  cd:2, hp:120, atk:15, range:35,  windup:.35, backswing:.65, speed:60,  kb:3, size:1.0,  color:'#f5f2ea', desc:'싸고 튼튼한 만능형' },
                                { id:'tank',   img:'tank.png',   icon:'🛡️', name:'벽 고양이',   cost:80,  cd:4, hp:600, atk:8,  range:28,  windup:.5,  backswing:.9,  speed:40,  kb:1, size:1.15, color:'#aebac7', desc:'HP가 높은 방어형' },
                                  { id:'axe',    img:'axe.png',    icon:'🪓', name:'도끼 고양이', cost:120, cd:6, hp:300, atk:55, range:32,  windup:.6,  backswing:1.2,  speed:50,  kb:4, size:1.1,  color:'#e0a15e', desc:'강한 한 방의 근접 딜러' },
                                    { id:'ninja',  img:'ninja.png',  icon:'🥷', name:'닌자 고양이', cost:90,  cd:3, hp:150, atk:18, range:25,  windup:.2,  backswing:.3,  speed:110, kb:2, size:.95,  color:'#46536b', desc:'빠른 이동·연타' },
                                      { id:'wizard', img:'wizard.png', icon:'🔮', name:'마법 고양이', cost:200, cd:8, hp:120, atk:70, range:170, windup:.7,  backswing:1.9,  speed:35,  kb:4, size:1.05, color:'#f5f2ea', aoe:70, desc:'장거리 광역 공격' },
                                        // 여기 밑에 새 캐릭터 추가:
                                          // { id:'archer', img:'archer.png', name:'궁수 고양이', cost:150, cd:5, hp:150, atk:35, range:120, windup:.4, backswing:1.0, speed:45, kb:3 },
                                          ];