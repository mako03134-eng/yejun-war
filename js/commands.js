// 플레이어 명령(출격/강화/대포) + 스폰/분노 — 입력·UI는 여기만 호출
import { W, FIELD_W, PLAYER_BASE_X, ENEMY_BASE_X } from './config.js';
import { game } from './state.js';
import { CATS, ENEMY_TYPES, CANNON, WALLET } from './data/index.js';
import { Fighter } from './entities.js';
import { addPoof, addText } from './effects.js';

export function spawnEnemy(type) {
  const def = ENEMY_TYPES[type];
    if (!def) { console.warn(`[spawn] 등록되지 않은 적 '${type}' — stages.js의 spawns 확인`); return; }
      game.enemies.push(new Fighter(def, ENEMY_BASE_X + 25 + Math.random() * 15, 'enemy'));
        if (def.id === 'hippo' && !game.hippoWarned) {
            game.hippoWarned = true; game.shake = Math.max(game.shake, .6);
                addText(FIELD_W / 2, 180, '거대한 적이 나타났다!', '#ff5b5b', 1.6, 20);
                  }
                  }

                  export function deployCat(i) {
                    if (game.scene !== 'battle' || game.paused || game.resultPending) return;
                      const cat = CATS[i];
                        if (game.t < (game.cd[cat.id] || 0) || game.money < cat.cost) return;
                          game.money -= cat.cost;
                            game.cd[cat.id] = game.t + cat.cd;
                              game.units.push(new Fighter(cat, PLAYER_BASE_X - 25 - Math.random() * 20, 'player'));
                                game.spawnedCount++;
                                  addPoof(PLAYER_BASE_X - 35, 315, '#ffffff');
                                  }

                                  export function upgradeWallet() {
                                    if (game.scene !== 'battle' || game.paused || game.resultPending) return;
                                      if (game.walletLv >= WALLET.costs.length) return;
                                        const cost = WALLET.costs[game.walletLv];
                                          if (game.money < cost) return;
                                            game.money -= cost; game.walletLv++;
                                              addText(PLAYER_BASE_X - 120, 235, `지갑 Lv.${game.walletLv + 1}!`, '#7ee08a', 1, 15);
                                              }

                                              export function fireCannon() {
                                                if (game.scene !== 'battle' || game.paused || game.resultPending) return;
                                                  if (game.cannonCharge < CANNON.chargeTime) return;
                                                    game.cannonCharge = 0; game.shake = 1;
                                                      addText(FIELD_W / 2, 240, '냥코 대포!!', '#ffffff', .9, 24);
                                                        game.fx.push({ t: 0, life: .55, draw(c) { // 전체 빔
                                                            const p = this.t / this.life;
                                                                c.save(); c.globalAlpha = (1 - p) * .85;
                                                                    c.fillStyle = '#fff8cf'; c.fillRect(0, 288, W, 24);
                                                                        c.fillStyle = '#ffffff'; c.fillRect(0, 295, W, 10);
                                                                            c.strokeStyle = '#ffd54a'; c.lineWidth = 4 * (1 - p) + 1;
                                                                                c.beginPath(); c.arc(W - p * W * 1.2, 300, 40 + p * 130, -1.4, 1.4); c.stroke();
                                                                                    c.restore();
                                                                                      }});
                                                                                        for (const e of game.enemies) { // 전 적 타격 + 강제 넉백
                                                                                            if (!e.alive) continue;
                                                                                                e.takeDamage(CANNON.atk);
                                                                                                    if (e.alive) { e.dmgTaken = 0; e.state = 'kb'; e.kbT = .6; }
                                                                                                      }
                                                                                                      }

                                                                                                      export function rageSpawn() { // 적 성 HP 50% → 분노 증원
                                                                                                        game.shake = .7;
                                                                                                          addText(FIELD_W / 2, 200, '적 성이 분노했다!', '#ff5b5b', 1.4, 18);
                                                                                                            for (const s of [{ type: 'snache', n: 2, gap: 1.5 }, { type: 'pigge', n: 1, gap: 2 }])
                                                                                                                for (let i = 0; i < s.n; i++) game.spawnQueue.push({ t: game.t + 1 + i * s.gap, type: s.type });
                                                                                                                  game.spawnQueue.sort((a, b) => a.t - b.t);
                                                                                                                  }