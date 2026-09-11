// 이펙트 헬퍼 — 위치 규약: x는 월드좌표, y는 캔버스좌표
import { WORLD_SCALE } from './config.js';
import { game } from './state.js';

export function addText(x, y, str, color, life = .8, size = 13) {
    game.fx.push({ t: 0, life, draw(c) {
        const p = this.t / this.life;
            c.save(); c.globalAlpha = 1 - p;
            c.font = `bold ${size}px "Malgun Gothic",sans-serif`; c.textAlign = 'center';
            c.lineWidth = 3; c.strokeStyle = 'rgba(0,0,0,.65)';
            c.strokeText(str, x * WORLD_SCALE, y - p * 26);
            c.fillStyle = color; c.fillText(str, x * WORLD_SCALE, y - p * 26);
            c.restore();
        }});
    }

    export function addSlash(x, y) {
        game.fx.push({ t: 0, life: .18, draw(c) {
            const p = this.t / this.life;
            c.save(); c.globalAlpha = 1 - p;
            c.strokeStyle = '#fff'; c.lineWidth = 3.5; c.lineCap = 'round';
            c.beginPath(); c.arc(x * WORLD_SCALE, y, 13 + p * 12, -.8, 1); c.stroke();
            c.restore();
        }});
    }

    export function addPoof(x, y, color) {
        for (let i = 0; i < 8; i++) {
            const a = Math.random() * Math.PI * 2, sp = 25 + Math.random() * 55;
            game.fx.push({ t: 0, life: .45 + Math.random() * .2,
                vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * .5 - 45,
                draw(c) {
                                                                                      const p = this.t / this.life;
                                                                                              c.globalAlpha = 1 - p; c.fillStyle = color;
                                                                                                      c.beginPath();
                                                                                                              c.arc(x * WORLD_SCALE + this.vx * this.t, y - 12 + this.vy * this.t + 90 * this.t * this.t, 4.5 * (1 - p * .6), 0, 7);
                                                                                                                      c.fill(); c.globalAlpha = 1;
                                                                                                                            }});
                                                                                                                              }
                                                                                                                              }

                                                                                                                              export function addExplosion(x, y, r) {
                                                                                                                                game.fx.push({ t: 0, life: .35, draw(c) {
                                                                                                                                    const p = this.t / this.life, sx = x * WORLD_SCALE;
                                                                                                                                    c.save(); c.globalAlpha = 1 - p;
                                                                                                                                    c.strokeStyle = '#ffd54a'; c.lineWidth = 5 * (1 - p) + 1;
                                                                                                                                    c.beginPath(); c.arc(sx, y - 12, r * WORLD_SCALE * (.35 + .65 * p), 0, 7); c.stroke();
                                                                                                                                    c.fillStyle = 'rgba(255,180,60,.35)'; c.fill();
                                                                                                                                    c.restore();
                                                                                                                }});
                                                                                                                                                            for (let i = 0; i < 6; i++)
                                                                                                                                                                addPoof(x + (Math.random() - .5) * r, y + (Math.random() - .5) * 20, i % 2 ? '#ffb84a' : '#ffe25b');
                                                                                                                                                                }