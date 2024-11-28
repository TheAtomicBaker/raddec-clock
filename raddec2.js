/*
Original code taken from the W3schools page: https://www.w3schools.com/graphics/canvas_clock_start.asp
*/

const canvas = document.getElementById('raddec-canvas');
        const ctx = canvas.getContext('2d');
        let radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90
        setInterval(drawClock, 100);

        function drawClock() {
          drawFace(ctx, radius);
          drawDayNumbers(ctx, radius);
          drawNightNumbers(ctx, radius);
          drawTime(ctx, radius);
        }

        function drawFace(ctx, radius) {
          const grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
          grad.addColorStop(0, '#123');
          grad.addColorStop(0.1, 'gold');
          grad.addColorStop(0.95, 'DarkGoldenrod');

          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, 2*Math.PI);

          const backgroundGrad = ctx.createLinearGradient(0,-400,0,400);
          backgroundGrad.addColorStop(0,  '#dceaff');
          backgroundGrad.addColorStop(.5, '#4574bc');
          backgroundGrad.addColorStop(1,  '#192029');
          ctx.fillStyle = backgroundGrad;
          ctx.fill();

          ctx.strokeStyle = grad;
          ctx.lineWidth = radius*0.1;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, radius*0.05, 0, 2*Math.PI);
          ctx.fillStyle = '#123';
          ctx.fill();
        }

        function drawDayNumbers(ctx, radius) {
          ctx.font = radius*0.1 + 'px Noto Sans, sans-serif';
          ctx.textBaseline='middle';
          ctx.textAlign='center';

          for(let num = 0; num < 10; num++){
            let ang = (num * Math.PI / 10) - (Math.PI/2);
            ctx.rotate(-ang);
            ctx.translate(0, -radius*0.8);
            ctx.rotate(ang);

            ctx.fillStyle = '#000';
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(-ang);
            ctx.translate(0, radius*0.8);
            ctx.rotate(ang);
          }
        }

        function drawNightNumbers(ctx, radius) {
          ctx.font = radius*0.1 + 'px Noto Sans, sans-serif';
          ctx.textBaseline='middle';
          ctx.textAlign='center';

          for(let num = 10; num < 20; num++){
            let ang = (num * Math.PI / 10) - (Math.PI/2);
            ctx.rotate(-ang);
            ctx.translate(0, -radius*0.8);
            ctx.rotate(ang);

            ctx.fillStyle = '#fff';
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(-ang);
            ctx.translate(0, radius*0.8);
            ctx.rotate(ang);
          }
        }

        function drawTime(ctx, radius){
            const now = new Date();
            let hr  = now.getHours();
            let min = now.getMinutes();
            let sec = now.getSeconds();
            //Botam
            Botam = Math.PI - (Math.PI * ((hr+(min/60)+(sec/3600))/12));
            drawHand(ctx, Botam, radius*0.6, radius*0.08);
            //tam
            tam   = Math.PI - (((2*Math.PI)*864) * ((hr+(min/60)+(sec/3600))/24));
            //drawHand(ctx, tam, radius*0.85, radius*0.05);
            //bitam
        }

        function drawHand(ctx, pos, length, width) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.moveTo(0,0);
            ctx.rotate(pos);
            ctx.lineTo(0, -length);
            ctx.stroke();
            ctx.rotate(-pos);
        }
