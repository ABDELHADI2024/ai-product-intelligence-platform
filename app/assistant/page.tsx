import Link from 'next/link';
import {
  BatteryCharging, Camera, Gamepad2, Gem,
  SlidersHorizontal, Sparkles, Send,
} from 'lucide-react';
import RecommendationCard from '@/components/RecommendationCard';
import {
  buildRecommendations,
  getProducts,
  getUseCaseLabel,
  normalizeUseCase,
  UseCase,
} from '@/lib/products';

export const dynamic = 'force-dynamic';

type AssistantPageProps = {
  searchParams?: Promise<{ use?: string; budget?: string }>;
};

const PRIORITIES: { id: UseCase; label: string; description: string; icon: React.ElementType; emoji: string }[] = [
  { id: 'balanced', label: 'Balanced',  description: 'Strong all-round choice across camera, battery, display, gaming, and value.', icon: Sparkles,        emoji: '⚡' },
  { id: 'camera',   label: 'Camera',    description: 'Best for photos, video, social media, and camera experience.',                icon: Camera,          emoji: '📸' },
  { id: 'battery',  label: 'Battery',   description: 'Best for long battery life and reliable daily usage.',                        icon: BatteryCharging, emoji: '🔋' },
  { id: 'gaming',   label: 'Gaming',    description: 'Best for performance, display refresh rate, and sustained power.',            icon: Gamepad2,        emoji: '🎮' },
  { id: 'value',    label: 'Value',     description: 'Best score for the money — practical and budget-smart.',                      icon: Gem,             emoji: '💰' },
];

const BUDGETS = [
  { label: 'Any budget',  value: '' },
  { label: 'Under €300',  value: '300' },
  { label: 'Under €500',  value: '500' },
  { label: 'Under €800',  value: '800' },
  { label: 'Premium +',   value: '1200' },
];

const SUGGESTED_PROMPTS = [
  { text: '📸 Best camera phone',    href: '/assistant?use=camera' },
  { text: '🔋 Longest battery',      href: '/assistant?use=battery' },
  { text: '🎮 Gaming beast',         href: '/assistant?use=gaming' },
  { text: '💰 Best value under 500', href: '/assistant?use=value&budget=500' },
  { text: '⚡ Balanced pick',        href: '/assistant?use=balanced' },
];

function buildAssistantUrl(use: UseCase, budget?: string) {
  const p = new URLSearchParams();
  p.set('use', use);
  if (budget) p.set('budget', budget);
  return `/assistant?${p.toString()}`;
}

// Import React for ElementType
import React from 'react';

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const use = normalizeUseCase(resolvedSearchParams.use);
  const budgetNumber = resolvedSearchParams.budget ? Number(resolvedSearchParams.budget) : null;

  const products = await getProducts(300);
  const recommendations = buildRecommendations(products, use, budgetNumber, 6);

  const activeLabel = getUseCaseLabel(use);
  const activeBudget = BUDGETS.find((b) => b.value === (resolvedSearchParams.budget || ''));

  return (
    <main>
      {/* ── HERO ── */}
      <div className="hero-bg page-hero" style={{ borderBottom: '1px solid rgba(124,58,237,.15)' }}>
        <div className="content-shell">
          <span className="tag tag-v" style={{ marginBottom: '.85rem', display: 'inline-flex' }}>
            <Sparkles size={11} /> Guided AI Assistant
          </span>
          <h1>
            Find your perfect smartphone
            <br />
            without confusion.
          </h1>
          <p className="ph-sub">
            Choose a priority and budget. Witflag ranks smartphones using
            real camera, battery, gaming, display, value, and global AI scores
            — no paid AI API required.
          </p>
        </div>
      </div>

      {/* ── CHAT-STYLE PROMPT BOX ── */}
      <section style={{ padding: '1.75rem 0', borderBottom: '1px solid rgba(124,58,237,.08)', background: 'var(--surface)' }}>
        <div className="content-shell">
          <div className="glass" style={{ borderRadius: 22, overflow: 'hidden', maxWidth: 680, margin: '0 auto' }}>

            {/* Chat header */}
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(124,58,237,.12)', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#7c3aed,#22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Sparkles size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#fff', fontSize: '.92rem' }}>Witflag Assistant</div>
                <div style={{ fontSize: '.65rem', color: 'var(--c)' }}>Powered by real AI scores · No hallucination</div>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '.3rem', fontSize: '.65rem', color: 'var(--green)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                Live
              </div>
            </div>

            {/* Chat bubble */}
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1rem' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(34,211,238,.12)', border: '1px solid rgba(34,211,238,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={14} color="#22d3ee" />
                </div>
                <div style={{ background: 'rgba(124,58,237,.1)', border: '1px solid rgba(124,58,237,.2)', borderRadius: '0 18px 18px 18px', padding: '.85rem 1rem', fontSize: '.83rem', color: 'var(--t2)', lineHeight: 1.6, maxWidth: 440 }}>
                  Hi! I&apos;m ready to find your best smartphone.
                  Currently showing: <strong style={{ color: 'var(--c)' }}>{activeLabel}</strong>
                  {activeBudget && activeBudget.value ? ` · ${activeBudget.label}` : ' · Any budget'}.
                  <br />
                  <span style={{ color: 'var(--t3)', fontSize: '.75rem' }}>
                    Click a suggestion below or use the filters on the left to refine.
                  </span>
                </div>
              </div>

              {/* Suggestion chips */}
              <div style={{ paddingLeft: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '.45rem' }}>
                {SUGGESTED_PROMPTS.map(({ text, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="tag tag-v"
                    style={{ fontSize: '.72rem', padding: '.35rem .8rem', textDecoration: 'none' }}
                  >
                    {text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Chat input — decorative, links to search */}
            <div style={{ padding: '.75rem 1.25rem', borderTop: '1px solid rgba(124,58,237,.1)', background: 'rgba(7,5,15,.4)', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
              <Link
                href="/search"
                style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '.65rem', background: 'rgba(124,58,237,.08)', border: '1px solid rgba(124,58,237,.2)', borderRadius: 999, padding: '.5rem 1rem', color: 'var(--t3)', fontSize: '.8rem', textDecoration: 'none' }}
              >
                <span style={{ flex: 1 }}>Or type a product search...</span>
              </Link>
              <Link
                href="/search"
                className="btn-cyan"
                style={{ borderRadius: '50%', width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
              >
                <Send size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTERS + RESULTS ── */}
      <section style={{ padding: '2rem 0 3rem' }}>
        <div className="content-shell" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '1.5rem', alignItems: 'start' }}>

          {/* Sidebar */}
          <aside className="glass" style={{ borderRadius: 20, padding: '1.25rem', position: 'sticky', top: '4.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.65rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(34,211,238,.1)', border: '1px solid rgba(34,211,238,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SlidersHorizontal size={15} color="#22d3ee" />
              </div>
              <div>
                <div style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--c)', fontWeight: 600 }}>Filters</div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: '#fff', fontSize: '.85rem' }}>Your profile</div>
              </div>
            </div>

            {/* Priority */}
            <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'var(--t2)', marginBottom: '.45rem' }}>Priority</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.35rem', marginBottom: '1.1rem' }}>
              {PRIORITIES.map((priority) => {
                const active = priority.id === use;
                const Icon = priority.icon;
                return (
                  <Link
                    key={priority.id}
                    href={buildAssistantUrl(priority.id, resolvedSearchParams.budget)}
                    className={`filter-link${active ? ' active' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
                      <Icon size={13} color={active ? '#22d3ee' : '#a89ec9'} />
                      <span className="fl-label">{priority.label}</span>
                    </div>
                    <div className="fl-desc">{priority.description}</div>
                  </Link>
                );
              })}
            </div>

            {/* Budget */}
            <div style={{ fontSize: '.7rem', fontWeight: 600, color: 'var(--t2)', marginBottom: '.45rem' }}>Budget</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.3rem' }}>
              {BUDGETS.map((budget) => {
                const active = (resolvedSearchParams.budget || '') === budget.value;
                return (
                  <Link
                    key={budget.label}
                    href={buildAssistantUrl(use, budget.value)}
                    className={`filter-link${active ? ' active' : ''}`}
                    style={{ padding: '.55rem .85rem' }}
                  >
                    <span className="fl-label" style={{ fontSize: '.82rem' }}>{budget.label}</span>
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Results */}
          <div>
            {/* Results header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '.5rem' }}>
              <div>
                <span className="tag tag-c" style={{ marginBottom: '.4rem', display: 'inline-flex' }}>
                  Top matches
                </span>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.35rem', color: '#fff', marginTop: '.2rem' }}>
                  Best for: {activeLabel}
                  {activeBudget && activeBudget.value ? ` · ${activeBudget.label}` : ''}
                </div>
                <div style={{ fontSize: '.78rem', color: 'var(--t2)', marginTop: '.2rem' }}>
                  Ranked by real AI scores — not paid generation. {recommendations.length} results.
                </div>
              </div>
              <Link href="/compare" className="btn-ghost" style={{ borderRadius: 12, fontSize: '.78rem', padding: '.5rem 1rem' }}>
                ⚖️ Open Compare
              </Link>
            </div>

            {/* Recommendation cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recommendations.map((rec, index) => (
                <RecommendationCard
                  key={rec.product.id}
                  recommendation={rec}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
