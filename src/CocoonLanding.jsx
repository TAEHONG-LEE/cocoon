import React, { useEffect, useState, useRef } from 'react';

// Custom hook for scroll-based animations
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation(0.3);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(end * easeOut));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export default function CocoonLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation(0.1);
  const [achieveRef, achieveVisible] = useScrollAnimation(0.2);
  const [globalRef, globalVisible] = useScrollAnimation(0.2);
  const [programRef, programVisible] = useScrollAnimation(0.2);
  const [interviewRef, interviewVisible] = useScrollAnimation(0.2);

  const programs = [
    {
      title: 'VT 프로젝트',
      desc: '실제 시장에서 검증하는 린스타트업 방법론 기반의 창업 프로젝트입니다. 아이디어 검증부터 MVP 제작까지 전 과정을 경험합니다.',
      quote: '"창업이 막연했는데, VT 프로젝트를 통해 실제로 고객을 만나고 피드백을 받으며 성장할 수 있었어요."',
      imagePos: 'right'
    },
    {
      title: '코쿤 박람회',
      desc: '매 학기말 진행되는 코쿤 박람회에서 한 학기 동안의 성과를 공유하고, 네트워킹을 통해 새로운 기회를 발견합니다.',
      quote: '"박람회에서 만난 선배와의 대화가 제 창업 여정의 전환점이 되었습니다."',
      imagePos: 'left'
    },
    {
      title: '스타트업 기업 탐방',
      desc: '국내 유수 스타트업을 직접 방문하여 현장의 이야기를 듣고, 창업 생태계를 체험합니다.',
      quote: '"실제 스타트업의 일하는 방식을 보고 느끼니 창업에 대한 두려움이 사라졌어요."',
      imagePos: 'right'
    }
  ];

  const testimonials = [
    {
      name: '김창업',
      role: '2기 출신 | 現 스타트업 대표',
      text: '코쿤에서의 2년이 저를 완전히 바꿔놓았습니다. 막연한 아이디어가 실제 사업이 되는 과정을 함께한 동료들, 아낌없이 조언해주신 선배들 덕분에 지금의 저와 회사가 있습니다.'
    },
    {
      name: '이도전',
      role: '3기 출신 | 現 개발자',
      text: '창업 동아리라서 무조건 창업만 해야 할 것 같았는데, 코쿤은 달랐어요. 도전하는 자세와 문제를 해결하는 방법을 배웠고, 그게 지금 개발자로서의 저에게 큰 자산이 됩니다.'
    },
    {
      name: '박성장',
      role: '4기 출신 | 現 대기업 재직',
      text: '코쿤에서 배운 것은 단순히 창업 기술이 아니라 삶을 대하는 태도였습니다. 어떤 상황에서도 포기하지 않고 길을 찾는 마인드셋, 그것이 코쿤의 진짜 가치입니다.'
    }
  ];

  return (
    <div style={{
      fontFamily: "'Pretendard', 'Noto Sans KR', -apple-system, sans-serif",
      background: '#0a0a0a',
      color: '#fff',
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .btn-primary {
          background: linear-gradient(135deg, #cd121e, #ff3344);
          color: white;
          border: none;
          padding: 16px 40px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(205, 18, 30, 0.4);
        }
        
        .btn-primary:hover::before {
          left: 100%;
        }
        
        .card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 30px 60px rgba(205, 18, 30, 0.2);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #cd121e, #ff6b7a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glow {
          box-shadow: 0 0 60px rgba(205, 18, 30, 0.3);
        }
        
        .nav-link {
          position: relative;
          transition: color 0.3s;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #cd121e;
          transition: width 0.3s;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .nav-link:hover {
          color: #cd121e;
        }
        
        .image-placeholder {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .image-placeholder::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(205, 18, 30, 0.1), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
        
        .parallax-bg {
          transition: transform 0.1s ease-out;
        }
        
        .testimonial-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .testimonial-card:hover {
          transform: scale(1.05);
          z-index: 10;
        }
      `}</style>

      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '20px 60px',
        background: scrollY > 50 ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        transition: 'all 0.3s ease',
        borderBottom: scrollY > 50 ? '1px solid rgba(205, 18, 30, 0.2)' : 'none'
      }}>
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '800',
            letterSpacing: '-1px'
          }}>
            <span style={{ color: '#cd121e' }}>CO</span>
            <span style={{ color: '#fff' }}>COON</span>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '48px',
            alignItems: 'center'
          }}>
            {['About', 'Interview', 'Program'].map((item, i) => (
              <a key={i} href={`#${item.toLowerCase()}`} className="nav-link" style={{
                color: '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                {item}
              </a>
            ))}
            <button className="btn-primary" style={{ padding: '12px 28px', fontSize: '15px' }}>
              지원하기
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(205, 18, 30, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(205, 18, 30, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite reverse'
        }} />
        
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease-out'
        }}>
          <p style={{
            fontSize: '18px',
            color: '#cd121e',
            fontWeight: '600',
            letterSpacing: '4px',
            marginBottom: '24px',
            textTransform: 'uppercase'
          }}>
            충남대학교 창업동아리
          </p>
        </div>
        
        <h1 style={{
          fontSize: 'clamp(40px, 8vw, 96px)',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '32px',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'all 0.8s ease-out 0.2s'
        }}>
          껍질을 깨고,
          <br />
          <span className="text-gradient">세상의 중심으로</span>
        </h1>
        
        <p style={{
          fontSize: '20px',
          color: '#888',
          maxWidth: '600px',
          marginBottom: '48px',
          lineHeight: '1.6',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'all 0.8s ease-out 0.4s'
        }}>
          도전과 실행으로 성장하는 창업 커뮤니티,<br />
          코쿤에서 당신의 한계를 깨보세요.
        </p>
        
        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'all 0.8s ease-out 0.6s'
        }}>
          <button className="btn-primary" style={{ fontSize: '18px', padding: '18px 48px' }}>
            지원하기 →
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'pulse 2s infinite'
        }}>
          <span style={{ fontSize: '12px', color: '#666', letterSpacing: '2px' }}>SCROLL</span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #cd121e, transparent)'
          }} />
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={achieveRef} id="about" style={{
        padding: '160px 60px',
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          opacity: achieveVisible ? 1 : 0,
          transform: achieveVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'all 0.8s ease-out'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            marginBottom: '24px'
          }}>
            2년간 <span className="text-gradient">성과</span>를 공유합니다.
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#888',
            maxWidth: '700px',
            margin: '0 auto 80px',
            lineHeight: '1.8'
          }}>
            코쿤은 도전과 실행이 만나는 곳입니다.<br />
            우리의 발자취가 증명하는 진짜 성장의 이야기를 만나보세요.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px'
        }}>
          {[
            { label: '우승 상금', value: 5000, suffix: '만원 +' },
            { label: '지원 사업', value: 40000, suffix: '만원 +' },
            { label: '연 매출', value: 35000, suffix: '만원 +' }
          ].map((item, i) => (
            <div key={i} className="card-hover" style={{
              background: 'linear-gradient(135deg, #141414, #1a1a1a)',
              borderRadius: '24px',
              padding: '48px 32px',
              border: '1px solid rgba(205, 18, 30, 0.2)',
              opacity: achieveVisible ? 1 : 0,
              transform: achieveVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.8s ease-out ${0.2 + i * 0.15}s`
            }}>
              <p style={{ color: '#888', fontSize: '18px', marginBottom: '16px' }}>{item.label}</p>
              <p style={{ fontSize: '42px', fontWeight: '800' }} className="text-gradient">
                <AnimatedCounter end={item.value} suffix={item.suffix} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Global Expansion Section */}
      <section ref={globalRef} style={{
        padding: '160px 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          opacity: globalVisible ? 1 : 0,
          transform: globalVisible ? 'translateX(-40px)' : 'translateX(0)',
          transition: 'all 0.8s ease-out'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            marginBottom: '24px'
          }}>
            코쿤의 무대는<br />
            <span className="text-gradient">세계로 확장</span>됩니다.
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#888',
            maxWidth: '600px',
            lineHeight: '1.8',
            marginBottom: '60px'
          }}>
            미국 실리콘밸리, 중국 상하이, 일본 도쿄, 싱가포르...<br />
            글로벌 스타트업 생태계를 직접 경험합니다.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {['Silicon Valley', 'Shanghai', 'Tokyo'].map((city, i) => (
            <div key={i} className="card-hover image-placeholder" style={{
              height: '400px',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '32px',
              opacity: globalVisible ? 1 : 0,
              transform: globalVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: `all 0.8s ease-out ${0.3 + i * 0.15}s`
            }}>
              <span style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#fff',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)'
              }}>
                {city}
              </span>
            </div>
          ))}
        </div>
        
        <div style={{
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #cd121e, transparent)',
          marginTop: '120px',
          opacity: globalVisible ? 1 : 0,
          transition: 'opacity 1s ease-out 0.8s'
        }} />
      </section>

      {/* Programs Section */}
      <section ref={programRef} id="program" style={{
        padding: '160px 60px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: '800',
          marginBottom: '80px',
          opacity: programVisible ? 1 : 0,
          transform: programVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s ease-out'
        }}>
          메인 <span className="text-gradient">활동</span>
        </h2>
        
        {programs.map((program, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: program.imagePos === 'right' ? 'row' : 'row-reverse',
            gap: '80px',
            alignItems: 'center',
            marginBottom: i < programs.length - 1 ? '120px' : 0,
            opacity: programVisible ? 1 : 0,
            transform: programVisible 
              ? 'translateX(0)' 
              : program.imagePos === 'right' ? 'translateX(-60px)' : 'translateX(60px)',
            transition: `all 0.8s ease-out ${0.3 + i * 0.2}s`
          }}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: '36px',
                fontWeight: '700',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <span style={{
                  width: '8px',
                  height: '40px',
                  background: '#cd121e',
                  borderRadius: '4px'
                }} />
                {program.title}
              </h3>
              <p style={{
                fontSize: '18px',
                color: '#aaa',
                lineHeight: '1.8',
                marginBottom: '32px'
              }}>
                {program.desc}
              </p>
              <blockquote style={{
                fontSize: '16px',
                color: '#666',
                fontStyle: 'italic',
                paddingLeft: '24px',
                borderLeft: '2px solid #cd121e'
              }}>
                {program.quote}
              </blockquote>
            </div>
            <div className="card-hover image-placeholder" style={{
              flex: 1,
              height: '360px',
              borderRadius: '24px',
              minWidth: '400px'
            }} />
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section ref={interviewRef} id="interview" style={{
        padding: '160px 60px',
        background: 'linear-gradient(180deg, transparent, rgba(205, 18, 30, 0.05), transparent)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            marginBottom: '80px',
            opacity: interviewVisible ? 1 : 0,
            transform: interviewVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out'
          }}>
            우리 모두<br />
            <span className="text-gradient">학생으로 시작</span>했습니다.
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {testimonials.map((item, i) => (
              <div key={i} className="testimonial-card" style={{
                background: 'linear-gradient(135deg, #141414, #1a1a1a)',
                borderRadius: '24px',
                padding: '48px',
                border: '1px solid rgba(255,255,255,0.05)',
                opacity: interviewVisible ? 1 : 0,
                transform: interviewVisible ? 'translateY(0)' : 'translateY(60px)',
                transition: `all 0.8s ease-out ${0.3 + i * 0.15}s`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #cd121e, #ff6b7a)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: '700'
                  }}>
                    {item.name[0]}
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '18px' }}>{item.name}</p>
                    <p style={{ color: '#888', fontSize: '14px' }}>{item.role}</p>
                  </div>
                </div>
                <p style={{
                  color: '#aaa',
                  lineHeight: '1.8',
                  fontSize: '16px'
                }}>
                  "{item.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '160px 60px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(205, 18, 30, 0.15) 0%, transparent 60%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '800',
            marginBottom: '24px'
          }}>
            당신의 <span className="text-gradient">껍질</span>을<br />
            깰 준비가 되셨나요?
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#888',
            marginBottom: '48px'
          }}>
            코쿤과 함께 새로운 도전을 시작하세요.
          </p>
          <button className="btn-primary glow" style={{
            fontSize: '20px',
            padding: '20px 56px'
          }}>
            지금 바로 지원하기
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div>
            <div style={{
              fontSize: '24px',
              fontWeight: '800',
              marginBottom: '8px'
            }}>
              <span style={{ color: '#cd121e' }}>CO</span>
              <span style={{ color: '#fff' }}>COON</span>
            </div>
            <p style={{ color: '#666', fontSize: '14px' }}>
              contact@cocoon.kr
            </p>
          </div>
          <p style={{ color: '#666', fontSize: '14px', textAlign: 'right' }}>
            대전광역시 유성구 대학로 99<br />
            충남대학교 창업보육센터
          </p>
        </div>
        
        <div style={{
          maxWidth: '1400px',
          margin: '40px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center'
        }}>
          <p style={{ color: '#444', fontSize: '13px' }}>
            © 2024 Cocoon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
