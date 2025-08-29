'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Download, Globe, Github, Linkedin, Mail, MapPin, Phone, Sun, Moon, ExternalLink, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { SITE } from '@/data/site'
import { PROJETOS } from '@/data/projects'
import { EXPERIENCIAS } from '@/data/experiences'
import { SKILLS } from '@/data/skills'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import  Image  from 'next/image'

function Section({ id, title, description, children }: { id: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div><h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>{description && <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>}</div>
          <Sparkles className="h-6 w-6 opacity-30" />
        </div>
        {children}
      </div>
    </section>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => true)
  useEffect(() => { const root = document.documentElement; if (dark) root.classList.add('dark'); else root.classList.remove('dark'); localStorage.setItem('theme', dark ? 'dark' : 'light') }, [dark])
  useEffect(() => { const saved = localStorage.getItem('theme'); if (saved) setDark(saved === 'dark') }, [])
  return (<Button variant="outline" size="icon" aria-label="Alternar tema" onClick={() => setDark(!dark)}>{dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}</Button>)
}

function Socials({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <a aria-label="GitHub" className="opacity-80 hover:opacity-100" href={SITE.socials.github} target="_blank" rel="noreferrer"><Github className="h-5 w-5" /></a>
      <a aria-label="LinkedIn" className="opacity-80 hover:opacity-100" href={SITE.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin className="h-5 w-5" /></a>
      <a aria-label="Website" className="opacity-80 hover:opacity-100" href={SITE.website} target="_blank" rel="noreferrer"><Globe className="h-5 w-5" /></a>
    </div>
  )
}

function Header() {
  const NAV = [{ href: '#sobre', label: 'Sobre' },{ href: '#projetos', label: 'Projetos' },{ href: '#experiencia', label: 'Experiência' },{ href: '#skills', label: 'Skills' },{ href: '#contato', label: 'Contacto' }]
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#inicio" className="font-bold tracking-tight">{SITE.name}</a>
        <nav className="hidden gap-6 md:flex">{NAV.map((item) => (<a key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-foreground">{item.label}</a>))}</nav>
        <div className="flex items-center gap-2"><ThemeToggle /><Button asChild><a href="#contato">Fale comigo</a></Button></div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background:radial-gradient(1200px_600px_at_50%_-20%,hsl(var(--primary)_/_0.25),transparent)]" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:py-28 md:grid-cols-2">
        <div>
          <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold leading-tight sm:text-5xl">{SITE.name}</motion.h1>
          <p className="mt-3 text-xl text-muted-foreground">{SITE.role}</p>
          <p className="mt-4 max-w-xl text-muted-foreground">{SITE.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button asChild><a href="#projetos">Ver projetos <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
            <Button variant="outline" asChild><a href="/cv-andre.pdf" download><Download className="mr-2 h-4 w-4" /> Download CV</a></Button>
            <Socials />
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {SITE.location}</span>
            <span className="inline-flex items-center gap-1"><Mail className="h-4 w-4" /> {SITE.email}</span>
            <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4" /> {SITE.phone}</span>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border shadow-sm">
           <Image
            src="https://picsum.photos/seed/hero/1200/900"
            alt="Capa do portfólio"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}

function ProjetoCard({ p }: { p: (typeof PROJETOS)[number] }) {
  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={p.cover}
          alt={`Capa do projeto ${p.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>{p.title}</span>
          <div className="flex gap-2">
            {p.live && (<a href={p.live} target="_blank" rel="noreferrer" aria-label="Ver site"><ExternalLink className="h-5 w-5 opacity-80 hover:opacity-100" /></a>)}
            {p.repo && (<a href={p.repo} target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-5 w-5 opacity-80 hover:opacity-100" /></a>)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{p.summary}</p>
        <div className="flex flex-wrap gap-2">{p.tags.map((t) => (<Badge key={t} variant="secondary" className="rounded-full">{t}</Badge>))}</div>
        {p.metrics?.length ? (<ul className="mt-2 grid gap-1 text-sm">{p.metrics.map((m) => (<li key={m} className="text-emerald-400">• {m}</li>))}</ul>) : null}
      </CardContent>
    </Card>
  )
}

function ExperienciaItem({ item }: { item: (typeof EXPERIENCIAS)[number] }) {
  return (
    <li className="relative pl-6">
      <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary" />
      <div className="flex flex-wrap items-baseline gap-x-2"><h3 className="font-semibold">{item.role}</h3><span className="text-muted-foreground">@ {item.company} • {item.period}</span></div>
      <div className="text-xs text-muted-foreground">{item.location}</div>
      <ul className="mt-2 grid gap-1 text-sm">{item.bullets.map((b, i) => (<li key={i}>• {b}</li>))}</ul>
    </li>
  )
}

function SkillsList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Object.entries(SKILLS).map(([cat, list]) => (
        <Card key={cat}>
          <CardHeader><CardTitle className="text-base">{cat}</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">{Array.from(list).map((s) => (<Badge key={s} variant="outline" className="rounded-full">{s}</Badge>))}</CardContent>
        </Card>
      ))}
    </div>
  )
}

function Contato() {
  const subject = encodeURIComponent('Olá, gostaria de falar sobre um projeto')
  const body = encodeURIComponent('Conte-me um pouco sobre o seu desafio e prazo.')
  const mailto = `mailto:${SITE.email}?subject=${subject}&body=${body}`
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Vamos conversar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Descreva rapidamente o seu desafio. Eu respondo em até 24h úteis.</p>
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Nome" required /><Input type="email" placeholder="Email" required />
            <Textarea placeholder="Mensagem" rows={5} required />
            <div className="flex gap-2">
              <Button type="submit" asChild><a href={mailto}>Enviar por email</a></Button>
              <Button variant="outline" asChild><a href={`https://wa.me/351900000000?text=${encodeURIComponent('Olá André! Vi o seu portfólio e quero falar sobre um projeto.')}`} target="_blank" rel="noreferrer">WhatsApp</a></Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card><CardHeader><CardTitle>Perguntas frequentes</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p><strong>Prazos</strong>: MVPs entre 4–8 semanas, conforme escopo.</p>
          <p><strong>Stack</strong>: React/Next, Node, DB relacional ou NoSQL, integrações.</p>
          <p><strong>Contrato</strong>: proposta + cronograma + milestones.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Page() {
  useEffect(() => {
    document.title = `${SITE.name} — ${SITE.role}`
    const metaDesc = document.querySelector('meta[name="description"]')
    const content = `${SITE.tagline} Localização: ${SITE.location}.`
    if (metaDesc) metaDesc.setAttribute('content', content)
    else { const m = document.createElement('meta'); m.name = 'description'; m.content = content; document.head.appendChild(m) }
  }, [])
  const jsonLd = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name, jobTitle: SITE.role, email: `mailto:${SITE.email}`, telephone: SITE.phone, url: SITE.website,
    sameAs: [SITE.socials.github, SITE.socials.linkedin], knowsAbout: SITE.keywords,
    address: { '@type': 'PostalAddress', addressLocality: SITE.location },
  }), [])
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header /><Hero />
      <Section id="sobre" title="Sobre mim" description="Rápido resumo de quem eu sou e como posso ajudar o seu negócio.">
        <div className="prose prose-invert"><p>Sou um desenvolvedor focado em transformar ideias em produtos digitais que performam. Trabalho com <strong>métricas</strong>, não apenas com código. Gosto de lançar rápido, medir e iterar.</p><p>Atualmente baseado em <strong>{SITE.location}</strong>, disponível para remoto e contratos.</p></div>
      </Section>
      <Section id="projetos" title="Projetos em destaque" description="Estudos de caso curtos com impacto de negócio.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{PROJETOS.map((p) => (<ProjetoCard key={p.title} p={p} />))}</div>
      </Section>
      <Section id="experiencia" title="Experiência" description="Onde atuei e no que entreguei.">
        <ol className="relative space-y-6 border-l pl-6">{EXPERIENCIAS.map((item) => (<ExperienciaItem key={item.company + item.period} item={item} />))}</ol>
      </Section>
      <Section id="skills" title="Skills" description="Tecnologias e competências que uso no dia a dia.">
        <SkillsList />
      </Section>
      <Section id="contato" title="Contacto" description="Quer tirar uma ideia do papel? Vamos falar.">
        <Contato />
      </Section>
      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {SITE.name}. Todos os direitos reservados.</p>
          <Socials />
        </div>
      </footer>
    </main>
  )
}
