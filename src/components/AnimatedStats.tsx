"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Handpicked Properties" },
  { value: 12000, suffix: "+", label: "Happy Guests" },
  { value: 3000, suffix: "+", label: "Five Star Reviews" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={elementRef}
      className="text-5xl font-bold mb-2"
      style={{ fontFamily: "var(--font-display)", color: "var(--color-accent-sage)" }}
    >
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          <p className="text-lg" style={{ color: "var(--color-neutral-dark)" }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}