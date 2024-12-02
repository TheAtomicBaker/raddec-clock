/*
Original code taken from the W3schools page: https://www.w3schools.com/graphics/canvas_clock_start.asp
*/

const canvas = document.getElementById('24hclock-canvas');
        const ctx = canvas.getContext('2d');
        let radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90
        setInterval(drawClock, 1000);
        
        function drawClock() {
          drawFace(ctx, radius);
          drawNumbers(ctx, radius);
          drawSubs(ctx, radius);
          drawTime(ctx, radius);
        }
        
        function drawFace(ctx, radius) {
          const grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
          grad.addColorStop(0, '#123');
          grad.addColorStop(0.1, 'gold');
          grad.addColorStop(0.95, 'DarkGoldenrod');
          ctx.beginPath();
          ctx.arc(0, 0, radius, 0, 2*Math.PI);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.strokeStyle = grad;
          ctx.lineWidth = radius*0.1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, radius*0.05, 0, 2*Math.PI);
          ctx.fillStyle = '#123';
          ctx.fill();
        }
        
        function drawNumbers(ctx, radius) {
          ctx.font = radius*0.1 + 'px Noto Sans, sans-serif';
          ctx.textBaseline='middle';
          ctx.textAlign='center';
          for(let num = 0; num < 24; num++){
            let ang = (num * Math.PI / 12) + Math.PI;
            ctx.rotate(-ang);
            ctx.translate(0, -radius*0.8);
            ctx.rotate(ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(-ang);
            ctx.translate(0, radius*0.8);
            ctx.rotate(ang);
          }
        }

        function drawSubs(ctx, radius) {
          ctx.font = radius*0.05 + 'px Noto Sans, sans-serif';
          ctx.textBaseline='middle';
          ctx.textAlign='center';
          for(let num = 0; num < 60; num++){
            let ang = (num * Math.PI / 30) - Math.PI/2;
            ctx.rotate(-ang);
            ctx.translate(0, -radius*0.9);
            ctx.rotate(ang);
            ctx.fillText(num.toString(), 0, 0);
            ctx.rotate(-ang);
            ctx.translate(0, radius*0.9);
            ctx.rotate(ang);
          }
        }
        
        function drawTime(ctx, radius){
            const now  = new Date();
            let hour   = now.getHours();
            let minute = now.getMinutes();
            let second = now.getSeconds();
            //hour
            hour=hour%24;
            hour= -(hour*Math.PI/12) - (minute*Math.PI/(12*60)) - (second*Math.PI/(12*60*60)) + Math.PI;
            drawHand(ctx, hour, radius*0.6, radius*0.08);
            //minute
            minute= -(minute*Math.PI/30)- (second*Math.PI/(30*60)) + Math.PI/2;
            drawHand(ctx, minute, radius*0.8, radius*0.05);
            // second
            second= -(second*Math.PI/30) + Math.PI/2;
            drawHand(ctx, second, radius*0.9, radius*0.01);
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
