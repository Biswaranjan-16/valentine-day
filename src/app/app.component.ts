import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.stagger-item', [
          style({ opacity: 0, transform: 'translateY(40px) rotate(2deg)' }),
          stagger(100, [
            animate('1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)', 
              style({ opacity: 1, transform: 'translateY(0) rotate(0deg)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('floatIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(60px) scale(0.95)' }),
        animate('1.4s cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    trigger('heartPulse', [
      state('idle', style({ transform: 'scale(1)' })),
      state('pulse', style({ transform: 'scale(1)' })),
      transition('idle => pulse', [
        animate('1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ transform: 'scale(1)', offset: 0 }),
          style({ transform: 'scale(1.25) rotate(5deg)', offset: 0.15 }),
          style({ transform: 'scale(1) rotate(0deg)', offset: 0.30 }),
          style({ transform: 'scale(1.25) rotate(-5deg)', offset: 0.45 }),
          style({ transform: 'scale(1) rotate(0deg)', offset: 0.60 }),
          style({ transform: 'scale(1.08)', offset: 0.75 }),
          style({ transform: 'scale(1)', offset: 1.0 })
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, AfterViewInit {
  showContent = false;
  heartState: 'idle' | 'pulse' = 'idle';
  currentYear: number = new Date().getFullYear();
  
  // Romantic quotes that rotate
  loveQuotes = [
    { text: "In your eyes, I found my home", author: "Unknown" },
    { text: "Love is composed of a single soul inhabiting two bodies", author: "Aristotle" },
    { text: "You are my today and all of my tomorrows", author: "Leo Christopher" },
    { text: "Every love story is beautiful, but ours is my favorite", author: "Unknown" },
    { text: "I carry your heart with me, I carry it in my heart", author: "E.E. Cummings" }
  ];
  
  currentQuoteIndex = 0;
  currentQuote = this.loveQuotes[0];
  
  // Romantic messages that appear when heart is clicked
  romanticMessages = [
    "Forever Yours 💕",
    "My Everything ✨",
    "You Complete Me 💖",
    "Endless Love 🌹",
    "Always & Forever 💝",
    "My Soulmate 💫",
    "Perfect Together 💞",
    "Love You More 🌺",
    "My Heart is Yours 💗",
    "You're My Dream ⭐"
  ];
  
  petals: Array<{delay: number, duration: number, left: number}> = [];
  stars: Array<{top: number, left: number, delay: number, size: number}> = [];
  
  // Enhanced memories with descriptions
  memories = [
    { 
      icon: '☕', 
      title: 'First Coffee Together', 
      date: 'That magical rainy afternoon',
      note: 'When time stopped and our story began...'
    },
    { 
      icon: '🎵', 
      title: 'Dancing to Our Song', 
      date: 'Under the moonlight',
      note: 'The melody that became ours forever...'
    },
    { 
      icon: '🌅', 
      title: 'Sunrise at the Beach', 
      date: 'Early morning walk',
      note: 'Watching the world wake up together...'
    },
    { 
      icon: '💌', 
      title: 'Love Letters Exchange', 
      date: 'Words from the heart',
      note: 'Every word a promise, every line a treasure...'
    },
    { 
      icon: '🌟', 
      title: 'Stargazing Night', 
      date: 'Lost in infinity',
      note: 'Finding our own constellation in the sky...'
    },
    { 
      icon: '🎁', 
      title: 'Surprise Moments', 
      date: 'Unexpected joy',
      note: 'Little things that mean everything...'
    }
  ];

  ngOnInit() {
    // Generate falling petals
    for (let i = 0; i < 25; i++) {
      this.petals.push({
        delay: Math.random() * 20,
        duration: 12 + Math.random() * 8,
        left: Math.random() * 100
      });
    }
    
    // Generate twinkling stars
    for (let i = 0; i < 30; i++) {
      this.stars.push({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 3
      });
    }
    
    setTimeout(() => {
      this.showContent = true;
      this.startHeartPulse();
      this.rotateQuotes();
    }, 200);
  }
  
  ngAfterViewInit() {
    this.initParallax();
  }
  
  startHeartPulse() {
    setInterval(() => {
      this.heartState = 'pulse';
      setTimeout(() => this.heartState = 'idle', 1800);
    }, 4000);
  }
  
  rotateQuotes() {
    setInterval(() => {
      this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.loveQuotes.length;
      this.currentQuote = this.loveQuotes[this.currentQuoteIndex];
    }, 6000);
  }
  
  initParallax() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        parallaxElements.forEach((el: any) => {
          const speed = el.dataset.speed || 0.5;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
      });
    }
  }
  
  onRevealLetter() {
    const letterContent = document.querySelector('.letter-content');
    letterContent?.classList.add('revealed');
    
    // Trigger a small celebration
    this.createMiniCelebration();
  }
  
  /**
   * SPECTACULAR HEART CLICK EFFECT
   * Creates multiple layers of romantic animations:
   * 1. Screen flash/glow
   * 2. Romantic message floating up
   * 3. Heart burst with trails
   * 4. Sparkle particles
   * 5. Ripple waves
   * 6. Confetti hearts
   */
  createHeartBurst(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;
    
    // 1. Create screen flash effect
    this.createScreenFlash(x, y);
    
    // 2. Display romantic message
    this.showRomanticMessage(x, y);
    
    // 3. Create heart burst with colorful trails (30 hearts!)
    this.createEnhancedHeartBurst(x, y, 30);
    
    // 4. Create sparkle particles
    this.createSparkles(x, y, 20);
    
    // 5. Create ripple waves
    this.createRipples(x, y, 3);
    
    // 6. Create confetti hearts falling
    this.createConfettiHearts(x, y, 15);
    
    // Optional: Add haptic feedback if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }
  }
  
  /**
   * Creates a glowing flash effect centered on click
   */
  private createScreenFlash(x: number, y: number) {
    const flash = document.createElement('div');
    flash.className = 'love-explosion-flash';
    flash.style.setProperty('--click-x', `${x}px`);
    flash.style.setProperty('--click-y', `${y}px`);
    document.body.appendChild(flash);
    
    setTimeout(() => flash.remove(), 1500);
  }
  
  /**
   * Shows a random romantic message floating upward
   */
  private showRomanticMessage(x: number, y: number) {
    const message = document.createElement('div');
    message.className = 'love-message';
    message.textContent = this.romanticMessages[Math.floor(Math.random() * this.romanticMessages.length)];
    message.style.left = `${x}px`;
    message.style.top = `${y}px`;
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 4000);
  }
  
  /**
   * Enhanced heart burst with trails and rotation
   */
  private createEnhancedHeartBurst(x: number, y: number, count: number) {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💘'];
    
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'burst-heart';
      heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = x + 'px';
      heart.style.top = y + 'px';
      
      // Create spiral/explosion pattern
      const angle = (i / count) * Math.PI * 2;
      const velocity = 80 + Math.random() * 120;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      heart.style.setProperty('--tx', tx + 'px');
      heart.style.setProperty('--ty', ty + 'px');
      
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 2000);
    }
  }
  
  /**
   * Creates sparkle particles radiating outward
   */
  private createSparkles(x: number, y: number, count: number) {
    const sparkleChars = ['✨', '⭐', '🌟', '💫', '✦', '✧'];
    
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-particle';
      sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
      sparkle.style.left = x + 'px';
      sparkle.style.top = y + 'px';
      sparkle.style.fontSize = (15 + Math.random() * 20) + 'px';
      
      const angle = Math.random() * Math.PI * 2;
      const distance = 60 + Math.random() * 80;
      
      sparkle.style.setProperty('--sx', Math.cos(angle) * distance + 'px');
      sparkle.style.setProperty('--sy', Math.sin(angle) * distance + 'px');
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 1500);
    }
  }
  
  /**
   * Creates expanding ripple waves
   */
  private createRipples(x: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      const ripple = document.createElement('div');
      ripple.className = 'love-ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.animationDelay = (i * 0.3) + 's';
      
      document.body.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 2000 + (i * 300));
    }
  }
  
  /**
   * Creates confetti hearts that fall down
   */
  private createConfettiHearts(x: number, y: number, count: number) {
    const confettiHearts = ['♥', '♡', '💕', '💗', '💖'];
    
    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-heart';
      confetti.textContent = confettiHearts[Math.floor(Math.random() * confettiHearts.length)];
      
      // Spread confetti across the top of screen
      confetti.style.left = (x - 200 + Math.random() * 400) + 'px';
      confetti.style.top = (y - 100) + 'px';
      confetti.style.color = `hsl(${Math.random() * 60 + 320}, 70%, 65%)`;
      confetti.style.setProperty('--rotation', (Math.random() * 720 - 360) + 'deg');
      confetti.style.animationDelay = (Math.random() * 0.5) + 's';
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  }
  
  /**
   * Mini celebration for button clicks
   */
  private createMiniCelebration() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Create a smaller, centered burst
    this.createEnhancedHeartBurst(centerX, centerY, 20);
    this.createSparkles(centerX, centerY, 15);
  }
}