import { useEffect, useState } from 'react';

export function useAnimationAndMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Each .appear -> own animationend -> add is-in (once: true)
  // 2. If animations are not running after two rAFs, force .is-in on all .appear and .hero-photo
  useEffect(() => {
    const appears = document.querySelectorAll<HTMLElement>('.appear');
    const heroPhotos = document.querySelectorAll<HTMLElement>('.hero-photo');

    let animationTriggered = false;

    appears.forEach((el) => {
      const handleAnimEnd = () => {
        el.classList.add('is-in');
        animationTriggered = true;
      };
      el.addEventListener('animationend', handleAnimEnd, { once: true });
    });

    heroPhotos.forEach((el) => {
      const handleAnimEnd = () => {
        el.classList.add('is-in');
        animationTriggered = true;
      };
      el.addEventListener('animationend', handleAnimEnd, { once: true });
    });

    // Check after two requestAnimationFrames if animations are not running or preferred reduced motion
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // If reduced motion is preferred or animations didn't trigger, force .is-in
        if (prefersReduced || !animationTriggered) {
          appears.forEach((el) => el.classList.add('is-in'));
          heroPhotos.forEach((el) => el.classList.add('is-in'));
        }
      });
    });
  }, []);

  // 3. Burger toggles body.menu-open
  // 4. Nav links and Escape close the menu
  // 5. Resize to (min-width: 901px) closes the menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 901) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
}
