import Phaser from 'phaser';
import { ApiService } from '../services/api.ts';

export class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('LeaderboardScene');
  }

  create(): void {
    const uiLayer = document.getElementById('ui-layer');
    if (!uiLayer) return;

    uiLayer.classList.remove('hidden');
    uiLayer.innerHTML = `
      <style>
        @keyframes lb-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .hof-bounce {
          animation: lb-bounce 2.2s infinite ease-in-out;
          display: inline-block;
        }
      </style>
      <div class="glass-panel" style="max-width: 440px; width: 95%;">
        <div style="font-size: 2.6rem; margin-bottom: 0.2rem; line-height: 1;">🏆</div>
        <h2 class="title-main" style="font-size: 1.8rem; margin-bottom: 0.8rem;">บอร์ดคะแนน & ประวัติ</h2>

        <!-- Tab selection -->
        <div style="display: flex; gap: 8px; margin-bottom: 1.2rem; width: 100%;">
          <button id="tab-solo-btn" class="sky-btn green" style="flex: 1; padding: 8px; font-size: 0.85rem; margin-bottom: 0;">🏆 อันดับผู้เล่นเดี่ยว</button>
          <button id="tab-group-btn" class="sky-btn secondary" style="flex: 1; padding: 8px; font-size: 0.85rem; margin-bottom: 0;">👥 ประวัติห้องกลุ่ม</button>
        </div>

        <div id="leaderboard-container" class="scrollable-y" style="
          margin-bottom: 1.2rem;
          text-align: left;
          height: 320px;
          padding-right: 2px;
        ">
          <!-- Dynamically populated -->
        </div>

        <button id="back-btn" class="sky-btn secondary">กลับหน้าหลัก</button>
      </div>
    `;

    const container = document.getElementById('leaderboard-container') as HTMLElement;
    const tabSoloBtn = document.getElementById('tab-solo-btn') as HTMLButtonElement;
    const tabGroupBtn = document.getElementById('tab-group-btn') as HTMLButtonElement;

    const selectSoloTab = () => {
      tabSoloBtn.className = 'sky-btn green';
      tabGroupBtn.className = 'sky-btn secondary';
      this.showSoloLeaderboard(container);
    };

    const selectGroupTab = () => {
      tabSoloBtn.className = 'sky-btn secondary';
      tabGroupBtn.className = 'sky-btn green';
      this.showGroupHistory(container);
    };

    tabSoloBtn.addEventListener('click', selectSoloTab);
    tabGroupBtn.addEventListener('click', selectGroupTab);

    document.getElementById('back-btn')?.addEventListener('click', () => {
      uiLayer.classList.add('hidden');
      uiLayer.innerHTML = '';
      this.scene.start('MenuScene');
    });

    // Default to Solo tab
    selectSoloTab();
  }

  private showSoloLeaderboard(container: HTMLElement): void {
    container.innerHTML = `
      <div style="text-align: center; color: #90a4ae; padding: 28px 0; font-size: 0.9rem; font-weight: 600;">
        กำลังโหลด...
      </div>
    `;

    ApiService.getLeaderboard(100).then((data) => {
      if (!data) {
        container.innerHTML = `
          <div style="color: #e53935; text-align: center; padding: 28px 0; font-weight: 700; font-size: 0.92rem;">
            ไม่สามารถโหลดข้อมูลได้ในขณะนี้
          </div>
        `;
        return;
      }

      if (data.length === 0) {
        container.innerHTML = `
          <div style="color: #90a4ae; text-align: center; padding: 32px 0; font-size: 0.9rem; font-weight: 600;">
            ยังไม่มีคะแนนบันทึกในขณะนี้
          </div>
        `;
        return;
      }

      const p1 = data.find((x) => x.rank === 1);
      const p2 = data.find((x) => x.rank === 2);
      const p3 = data.find((x) => x.rank === 3);

      const renderColumn = (player: any, position: 'first' | 'second' | 'third') => {
        if (!player) {
          return `<div style="flex: 1; opacity: 0; pointer-events: none;"></div>`;
        }

        let height = '60px';
        let badge = '🏆';
        let bg = '';
        let border = '';
        let nameColor = '#b8860b';
        let textShadow = '';
        let animClass = '';
        let order = 1;

        if (position === 'first') {
          height = '78px';
          badge = '👑';
          bg = 'linear-gradient(180deg, #FFE082 0%, #FFB300 100%)';
          border = '2px solid #FFD54F';
          nameColor = '#b8860b';
          textShadow = '0 1px 3px rgba(184, 134, 11, 0.2)';
          animClass = 'hof-bounce';
          order = 2; // Middle
        } else if (position === 'second') {
          height = '62px';
          badge = '🥈';
          bg = 'linear-gradient(180deg, #ECEFF1 0%, #B0BEC5 100%)';
          border = '2px solid #CFD8DC';
          nameColor = '#455a64';
          order = 1; // Left
        } else if (position === 'third') {
          height = '50px';
          badge = '🥉';
          bg = 'linear-gradient(180deg, #FFCCBC 0%, #FF8A65 100%)';
          border = '2px solid #FFCCBC';
          nameColor = '#8d6e63';
          order = 3; // Right
        }

        return `
          <div style="
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            order: ${order};
            min-width: 0;
          ">
            <!-- Badge/Emoji -->
            <div class="${animClass}" style="font-size: 1.5rem; margin-bottom: 2px; height: 28px; display: flex; align-items: center; justify-content: center;">
              ${badge}
            </div>
            <!-- Nickname -->
            <div style="
              font-weight: 800;
              font-size: 0.8rem;
              color: ${nameColor};
              text-shadow: ${textShadow};
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              text-align: center;
              padding: 0 4px;
            ">${player.nickname}</div>
            <!-- Score -->
            <div style="
              font-size: 0.72rem;
              font-weight: 700;
              color: #5c8fa8;
              margin-bottom: 4px;
            ">${player.score} pt</div>
            <!-- Pedestal block -->
            <div style="
              width: 100%;
              height: ${height};
              background: ${bg};
              border: ${border};
              border-bottom: none;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 8px rgba(0,0,0,0.05);
            ">
              <span style="
                font-family: 'Nunito', sans-serif;
                font-size: 1.4rem;
                font-weight: 900;
                color: rgba(255,255,255,0.9);
              ">
                ${position === 'first' ? '1' : position === 'second' ? '2' : '3'}
              </span>
            </div>
          </div>
        `;
      };

      let html = '';

      // Render Hall of Fame podium if at least one player exists in top 3
      if (p1 || p2 || p3) {
        html += `
          <div style="
            text-align: center;
            font-weight: 900;
            color: #FFB300;
            font-size: 0.8rem;
            letter-spacing: 2px;
            margin-bottom: 8px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.05);
          ">
            ✨ HALL OF FAME ✨
          </div>
          <div class="hof-podium" style="
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 10px;
            margin-bottom: 16px;
            padding: 12px 10px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 100%);
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 8px 24px rgba(26, 58, 92, 0.04);
          ">
            ${renderColumn(p2, 'second')}
            ${renderColumn(p1, 'first')}
            ${renderColumn(p3, 'third')}
          </div>
        `;
      }

      let listHtml = `
        <div class="lb-header" style="
          display: flex;
          justify-content: space-between;
          font-weight: 800;
          color: #5c8fa8;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 6px;
          margin-bottom: 8px;
          font-size: 0.85rem;
        ">
          <span>ผู้เล่น</span>
          <span>คะแนน</span>
        </div>
      `;

      let hasRanksBelow3 = false;
      data.forEach((entry) => {
        if (entry.rank <= 3) return; // Already rendered in HOF podium
        hasRanksBelow3 = true;

        let rowStyle = '';
        let nameStyle = 'color: #1a3a5c;';
        let scoreColor = '#1565C0';

        if (entry.rank >= 4 && entry.rank <= 10) {
          // Decreasing highlight emphasis
          const step = entry.rank - 4; // 0 for rank 4, 6 for rank 10
          const bgOpacity = 0.16 - step * 0.023; // 0.16 down to 0.02
          const borderOpacity = 1.0 - step * 0.14; // 1.0 down to 0.16
          const fontWeight = 800 - step * 30; // 800 down to 620
          
          rowStyle = `
            background: rgba(33, 150, 243, ${bgOpacity});
            border-left: 4px solid rgba(33, 150, 243, ${borderOpacity});
            font-weight: ${fontWeight};
          `;
          nameStyle = `color: #1a3a5c; font-weight: ${fontWeight};`;
          scoreColor = `rgba(21, 101, 192, ${0.7 + borderOpacity * 0.3})`;
        } else {
          // Rank 11+
          rowStyle = `
            background: rgba(255, 255, 255, 0.4);
            border-left: 4px solid transparent;
          `;
          nameStyle = `color: #546e7a; font-weight: 600;`;
          scoreColor = '#78909c';
        }

        listHtml += `
          <div class="lb-row" style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            border-radius: 8px;
            margin-bottom: 6px;
            border-top: 1px solid rgba(0, 0, 0, 0.05);
            border-right: 1px solid rgba(0, 0, 0, 0.05);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.15s ease;
            ${rowStyle}
          ">
            <span style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              max-width: 220px;
              ${nameStyle}
            ">
              <span style="color:#90a4ae; font-size:0.8rem; margin-right:6px;">${entry.rank}.</span>${entry.nickname}
            </span>
            <span style="
              font-family: 'Nunito', sans-serif;
              font-weight: 800;
              color: ${scoreColor};
              font-size: 0.95rem;
            ">${entry.score}</span>
          </div>
        `;
      });

      if (hasRanksBelow3) {
        html += listHtml;
      }

      container.innerHTML = html;
    });
  }

  private showGroupHistory(container: HTMLElement): void {
    container.innerHTML = `
      <div style="text-align: center; color: #90a4ae; padding: 28px 0; font-size: 0.9rem; font-weight: 600;">
        กำลังโหลด...
      </div>
    `;

    const skinsList: Record<string, string> = {
      sea_urchin: '/assets/characters/sea_urchin.png',
      shark: '/assets/characters/shark.png',
      squid: '/assets/characters/squid.png',
      TRex: '/assets/characters/TRex.png',
      triceratops: '/assets/characters/triceratops.png',
      turtle: '/assets/characters/turtle.png',
      lionfish: '/assets/characters/lionfish.png',
      elephant: '/assets/characters/elephant.png',
      dolphin: '/assets/characters/dolphin.png',
      dog: '/assets/characters/dog.png',
      doctor_stringray: '/assets/characters/doctor_stringray.png',
      brachiosaurus: '/assets/characters/brachiosaurus.png',
      baby_stringray: '/assets/characters/baby_stringray.png',
      baby_dolphin: '/assets/characters/baby_dolphin.png',
    };

    ApiService.getRoomHistory().then((data) => {
      if (!data) {
        container.innerHTML = `
          <div style="color: #e53935; text-align: center; padding: 28px 0; font-weight: 700; font-size: 0.92rem;">
            ไม่สามารถโหลดประวัติได้ในขณะนี้
          </div>
        `;
        return;
      }

      if (data.length === 0) {
        container.innerHTML = `
          <div style="color: #90a4ae; text-align: center; padding: 32px 0; font-size: 0.9rem; font-weight: 600;">
            ยังไม่มีประวัติห้องเล่นกลุ่มบันทึกไว้
          </div>
        `;
        return;
      }

      let html = '';
      data.forEach((history: any) => {
        const dateStr = new Date(history.created_at).toLocaleString('th-TH', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: 'short'
        });

        const resultsList = history.results || [];
        const totalParticipants = resultsList.length;

        const top3 = resultsList.slice(0, 3);
        const podiumSummary = top3.map((p: any) => {
          let emoji = '🥇';
          let bg = 'rgba(255, 179, 0, 0.08)';
          let border = '1px solid rgba(255, 179, 0, 0.35)';
          let nameColor = '#b8860b';
          let scoreColor = '#b8860b';

          if (p.rank === 2) {
            emoji = '🥈';
            bg = 'rgba(176, 190, 197, 0.08)';
            border = '1px solid rgba(176, 190, 197, 0.35)';
            nameColor = '#455a64';
            scoreColor = '#546e7a';
          } else if (p.rank === 3) {
            emoji = '🥉';
            bg = 'rgba(255, 138, 101, 0.08)';
            border = '1px solid rgba(255, 138, 101, 0.35)';
            nameColor = '#8d6e63';
            scoreColor = '#8d6e63';
          }

          const skinImg = skinsList[p.skin] || '/assets/characters/turtle.png';

          return `
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: ${bg};
              border: ${border};
              border-radius: 10px;
              padding: 8px 12px;
              margin-bottom: 6px;
            ">
              <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
                <span style="font-size: 1.25rem; line-height: 1;">${emoji}</span>
                <img src="${skinImg}" style="width: 32px; height: 32px; image-rendering: pixelated; object-fit: contain;" />
                <span style="
                  font-weight: 800;
                  color: ${nameColor};
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  max-width: 140px;
                ">${p.nickname}</span>
              </div>
              <span style="
                font-family: 'Nunito', sans-serif;
                font-weight: 800;
                color: ${scoreColor};
                font-size: 0.88rem;
              ">${p.score} pt</span>
            </div>
          `;
        }).join('');

        const bodyContent = totalParticipants === 0
          ? `<div style="text-align: center; color: #90a4ae; padding: 12px 0; font-weight: 600; font-size: 0.8rem;">ไม่มีผู้แข่งขันส่งคะแนน</div>`
          : podiumSummary;

        html += `
          <div style="
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.02);
            font-size: 0.82rem;
          ">
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-weight: 800;
              color: #0288d1;
              margin-bottom: 8px;
              font-size: 0.76rem;
              border-bottom: 1px solid rgba(0, 0, 0, 0.05);
              padding-bottom: 6px;
            ">
              <span>🔑 PIN: ${history.room_pin}</span>
              <span style="color: #4caf50;">👥 ${totalParticipants} คน</span>
              <span style="color: #78909c; font-size: 0.72rem; font-weight: 700;">🕒 ${dateStr}</span>
            </div>
            <div style="color: #1a3a5c; line-height: 1.4; padding-left: 2px;">
              ${bodyContent}
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
    });
  }
}
