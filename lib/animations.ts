import gsap from 'gsap';

export const animateIn = (element: HTMLElement, delay: number = 0) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20, scale: 0.9 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      delay,
      ease: 'back.out',
    }
  );
};

export const animateCardHover = (element: HTMLElement) => {
  gsap.to(element, {
    y: -10,
    boxShadow: '0 20px 40px rgba(0, 217, 255, 0.3)',
    duration: 0.3,
    overwrite: 'auto',
  });
};

export const animateCardHoverOut = (element: HTMLElement) => {
  gsap.to(element, {
    y: 0,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    duration: 0.3,
    overwrite: 'auto',
  });
};

export const animateClick = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
  });
};

export const animateCarousel = (container: HTMLElement, direction: number) => {
  const scroll = container.scrollLeft;
  gsap.to(container, {
    scrollLeft: scroll + direction * 300,
    duration: 0.6,
    ease: 'power2.inOut',
  });
};

export const animateCountUp = (
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 1
) => {
  gsap.fromTo(
    { value: start },
    { value: end },
    {
      duration,
      onUpdate() {
        element.textContent = Math.ceil(this.targets()[0].value).toString();
      },
    }
  );
};

export const createParticles = (x: number, y: number) => {
  const colors = ['#00D9FF', '#B026FF', '#FF006E'];
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.zIndex = '9999';
    
    document.body.appendChild(particle);
    
    const angle = (Math.PI * 2 * i) / 8;
    const velocity = 4 + Math.random() * 4;
    
    gsap.to(particle, {
      x: Math.cos(angle) * velocity * 50,
      y: Math.sin(angle) * velocity * 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete() {
        particle.remove();
      },
    });
  }
};

export const animateBackgroundMove = (element: HTMLElement) => {
  gsap.to(element, {
    backgroundPosition: '200% 200%',
    duration: 20,
    ease: 'none',
    repeat: -1,
  });
};

export const animatePulse = (element: HTMLElement) => {
  gsap.to(element, {
    boxShadow: [
      '0 0 20px rgba(0, 217, 255, 0.5)',
      '0 0 40px rgba(176, 38, 255, 0.5)',
      '0 0 20px rgba(0, 217, 255, 0.5)',
    ],
    duration: 2,
    repeat: -1,
    ease: 'sine.inOut',
  });
};
