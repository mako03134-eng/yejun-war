// 렌더 오케스트레이션: 배경 → 성 → 유닛(y정렬) → 이펙트
import { ctx, rr, drawHpBar } from './canvas.js';
import { W, H, HORIZON, WORLD_SCALE } from './config.js';
import { game } from './state.js';
import { drawFighter } from './sprites.js';

const decor = {
  clouds: Array.from({ length: 4 }, () => ({ x: Math.random() * W, y: 25 + Math.random() * 90, s: .7 + Math.random() * .7 })),
    tufts: Array.from({ length: 30 }, () => ({ x: Math.random() * W, y: HORIZON + 12 + Math.random() * 145 })),
      flowers: Array.from({ length: 9 }, () => ({ x: Math.random() * W, y: HORIZON + 18 + Math.random() * 140 })),
      };

      function drawBackground() {
        ctx.fillStyle = '#cfe9f5'; ctx.fillRect(0, 0, W, HORIZON); // 하늘
          ctx.fillStyle = 'rgba(255,255,255,.9)';
            for (const cl of decor.clouds) { // 구름
                const cx = ((cl.x + game.t * 5) % (W + 180)) - 90;
                    ctx.beginPath();
                        ctx.arc(cx, cl.y, 14 * cl.s, 0, 7); ctx.arc(cx + 16 * cl.s, cl.y - 6 * cl.s, 11 * cl.s, 0, 7);
                            ctx.arc(cx + 30 * cl.s, cl.y, 12 * cl.s, 0, 7); ctx.fill();
                              }
                                ctx.fillStyle = '#b7dba5'; // 원경 언덕
                                  for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(90 + i * 220, HORIZON + 30, 62, 0, 7); ctx.fill(); }
                                    ctx.fillStyle = '#a3d193';
                                      for (let i = 0; i < 6; i++) { ctx.beginPath(); ctx.arc(40 + i * 180, HORIZON + 22, 36, 0, 7); ctx.fill(); }
                                        ctx.fillStyle = '#8cc45e'; ctx.fillRect(0, HORIZON, W, H - HORIZON); // 지면
                                          ctx.fillStyle = '#7ab34e'; ctx.fillRect(0, HORIZON, W, 5);
                                            ctx.strokeStyle = '#6ea844'; ctx.lineWidth = 2; ctx.beginPath(); // 잔디
                                              for (const tf of decor.tufts) {
                                                  ctx.moveTo(tf.x, tf.y); ctx.lineTo(tf.x - 3, tf.y - 6);
                                                      ctx.moveTo(tf.x, tf.y); ctx.lineTo(tf.x, tf.y - 8);
                                                          ctx.moveTo(tf.x, tf.y); ctx.lineTo(tf.x + 3, tf.y - 6);
                                                            }
                                                              ctx.stroke();
                                                                for (const fl of decor.flowers) { // 꽃
                                                                    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(fl.x, fl.y, 3, 0, 7); ctx.fill();
                                                                        ctx.fillStyle = '#ffd54a'; ctx.beginPath(); ctx.arc(fl.x, fl.y, 1.3, 0, 7); ctx.fill();
                                                                          }
                                                                          }

                                                                          function drawBase(b) {
                                                                            const x = b.x * WORLD_SCALE, y = b.y, isEnemy = b.side === 'enemy', flash = b.hitT > 0;
                                                                              ctx.save();
                                                                                ctx.translate(x + (flash ? (Math.random() - .5) * 5 : 0), y);
                                                                                  if (isEnemy && game.raged) { // 분노 오라
                                                                                      ctx.globalAlpha = .22 + Math.sin(game.t * 6) * .08; ctx.fillStyle = '#ff4d4d';
                                                                                          ctx.beginPath(); ctx.ellipse(0, -60, 62, 62, 0, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
                                                                                            }
                                                                                              ctx.fillStyle = 'rgba(0,0,0,.15)';
                                                                                                ctx.beginPath(); ctx.ellipse(0, 4, 46, 8, 0, 0, 7); ctx.fill();
                                                                                                  const wall = flash ? '#ffffff' : (isEnemy ? '#9a93a8' : '#f3ecdb');
                                                                                                    const roof = isEnemy ? '#6e5a8e' : '#7fb8d4';
                                                                                                      const line = '#2e2a3e';
                                                                                                        ctx.fillStyle = wall; rr(-42, -108, 84, 108, 7); ctx.fill(); // 성벽
                                                                                                          ctx.strokeStyle = line; ctx.lineWidth = 3; ctx.stroke();
                                                                                                            ctx.fillStyle = roof; // 톱니
                                                                                                              for (let i = -2; i <= 2; i++) { rr(i * 17 - 6, -121, 12, 15, 3); ctx.fill(); ctx.lineWidth = 2; ctx.stroke(); }
                                                                                                                rr(-45, -110, 90, 11, 5); ctx.fill(); ctx.lineWidth = 3; ctx.stroke();
                                                                                                                  ctx.fillStyle = isEnemy ? '#4a3654' : '#c9a06b'; // 문
                                                                                                                    ctx.beginPath(); ctx.moveTo(-13, 0); ctx.lineTo(-13, -30);
                                                                                                                      ctx.arc(0, -30, 13, Math.PI, 0); ctx.lineTo(13, 0); ctx.closePath();
                                                                                                                        ctx.fill(); ctx.stroke();
                                                                                                                          ctx.fillStyle = flash ? '#fff' : '#333340'; // 눈(창)
                                                                                                                            for (const ex of [-24, 24]) { rr(ex - 5, -86, 10, 15, 4); ctx.fill(); }
                                                                                                                              if (isEnemy) { // 화난 눈썹
                                                                                                                                  ctx.strokeStyle = '#333340'; ctx.lineWidth = 3; ctx.beginPath();
                                                                                                                                      ctx.moveTo(-30, -92); ctx.lineTo(-18, -86); ctx.moveTo(30, -92); ctx.lineTo(18, -86); ctx.stroke();
                                                                                                                                        } else { // 고양이 귀 + 깃발
                                                                                                                                            ctx.fillStyle = wall; ctx.strokeStyle = line; ctx.lineWidth = 3;
                                                                                                                                                ctx.beginPath(); ctx.moveTo(-30, -118); ctx.lineTo(-24, -146); ctx.lineTo(-10, -119); ctx.closePath(); ctx.fill(); ctx.stroke();
                                                                                                                                                    ctx.beginPath(); ctx.moveTo(10, -119); ctx.lineTo(24, -146); ctx.lineTo(30, -118); ctx.closePath(); ctx.fill(); ctx.stroke();
                                                                                                                                                        ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, -108); ctx.lineTo(0, -150); ctx.stroke();
                                                                                                                                                            ctx.fillStyle = '#ff9d3c';
                                                                                                                                                                ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(22, -143); ctx.lineTo(0, -136); ctx.closePath(); ctx.fill(); ctx.stroke();
                                                                                                                                                                  }
                                                                                                                                                                    drawHpBar(0, -162, b.hp / b.maxHp, 96, b.side);
                                                                                                                                                                      ctx.fillStyle = '#2e2a3e'; ctx.font = 'bold 11px "Malgun Gothic",sans-serif';
                                                                                                                                                                        ctx.textAlign = 'center'; ctx.fillText(isEnemy ? '적 성' : '고양이 기지', 0, -168);
                                                                                                                                                                          ctx.restore();
                                                                                                                                                                          }

                                                                                                                                                                          export function render() {
                                                                                                                                                                            ctx.save();
                                                                                                                                                                              if (game.shake > 0 && !game.paused)
                                                                                                                                                                                  ctx.translate((Math.random() - .5) * game.shake * 12, (Math.random() - .5) * game.shake * 8);
                                                                                                                                                                                    drawBackground();
                                                                                                                                                                                      drawBase(game.enemyBase);
                                                                                                                                                                                        drawBase(game.playerBase);
                                                                                                                                                                                          const fighters = [...game.units, ...game.enemies].sort((a, b) => a.y - b.y); // y정렬(깊이)
                                                                                                                                                                                            for (const f of fighters) drawFighter(f);
                                                                                                                                                                                              for (const p of game.projectiles) p.draw(ctx);
                                                                                                                                                                                                for (const fx of game.fx) fx.draw(ctx);
                                                                                                                                                                                                  ctx.restore();
                                                                                                                                                                                                  }