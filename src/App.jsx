import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import {
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaPinterestP,
} from 'react-icons/fa'
import { FiClock, FiMail, FiMapPin, FiMenu, FiX } from 'react-icons/fi'
import {
  galleryImages,
  highlights,
  menuCategories,
  siteLinks,
  stats,
  testimonials,
} from './data'

const heroImage =
  'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=80'
const chefImage =
  'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80'

async function submitJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.errors?.[0] || result.message || 'Request failed.')
  }

  return result
}

async function loadDashboard() {
  const response = await fetch('/api/dashboard')
  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'Unable to load dashboard.')
  }

  return result
}

function App() {
  return (
    <div className="min-h-screen bg-royal-950 text-cream-50">
      <ScrollToTop />
      <DecorativeBackdrop />
      <Navbar />
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-table" element={<BookTablePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function DecorativeBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[-10rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute right-[-8rem] top-[20%] h-[22rem] w-[22rem] rounded-full bg-maroon-400/20 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-gold-300/10 blur-3xl" />
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gold-500/15 bg-royal-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/40 bg-gold-500/10 text-xl font-semibold text-gold-300 shadow-soft">
            RP
          </div>
          <div>
            <p className="font-display text-lg tracking-[0.25em] text-gold-300">
              HOTEL RAJDHANI PALACE
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-cream-200/70">
              Pune
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {siteLinks.map((link) => (
            <NavItem key={link.path} link={link} onClick={() => setOpen(false)} />
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/30 bg-cream-50/5 text-gold-200 transition hover:border-gold-300 hover:text-gold-50 lg:hidden"
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-gold-500/15 bg-royal-950/95 px-5 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {siteLinks.map((link) => (
              <NavItem
                key={link.path}
                link={link}
                mobile
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  )
}

function NavItem({ link, mobile = false, onClick }) {
  return (
    <NavLink
      to={link.path}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'rounded-full px-4 py-2 text-sm font-medium tracking-[0.18em] uppercase transition',
          mobile ? 'text-left' : '',
          isActive
            ? 'bg-gold-400 text-royal-950 shadow-soft'
            : 'text-cream-100/80 hover:bg-cream-50/6 hover:text-gold-100',
        ].join(' ')
      }
    >
      {link.name}
    </NavLink>
  )
}

function PageShell({ eyebrow, title, description, children }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="mb-3 font-display text-sm uppercase tracking-[0.4em] text-gold-300">
          {eyebrow}
        </p>
        <h1 className="text-balance font-display text-4xl text-cream-50 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-cream-100/75">{description}</p>
      </div>
      {children}
    </section>
  )
}

function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-18 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <div className="relative z-10 flex flex-col justify-center">
            <p className="mb-5 font-display text-sm uppercase tracking-[0.45em] text-gold-300">
              Authentic Taste of India
            </p>
            <h1 className="max-w-4xl text-balance font-display text-5xl leading-none text-cream-50 sm:text-6xl lg:text-7xl">
              Hotel Rajdhani Palace
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream-100/75 sm:text-xl">
              A royal dining experience in Pune where timeless Indian flavors,
              elegant interiors, and heartfelt hospitality come together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/menu"
                className="rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-royal-950 transition hover:-translate-y-0.5 hover:bg-gold-400"
              >
                View Menu
              </Link>
              <Link
                to="/book-table"
                className="rounded-full border border-gold-300/45 bg-cream-50/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-gold-100 transition hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-500/10"
              >
                Reserve Table
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-gold-500/15 bg-cream-50/5 p-5 shadow-soft"
                >
                  <p className="text-sm uppercase tracking-[0.25em] text-cream-100/60">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-2xl text-gold-200">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 hidden h-36 w-36 rounded-full border border-gold-300/20 lg:block" />
            <div className="absolute -right-4 bottom-8 hidden h-44 w-44 rounded-full border border-gold-300/15 lg:block" />
            <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/15 bg-cream-50/5 p-3 shadow-soft-lg">
              <img
                src={heroImage}
                alt="Luxurious dining hall at Hotel Rajdhani Palace"
                className="h-[26rem] w-full rounded-[1.4rem] object-cover sm:h-[32rem]"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-gold-300/20 bg-royal-950/70 p-5 backdrop-blur-md">
                <p className="font-display text-xl text-gold-200">
                  Royal dining, festive gatherings, and signature Indian feasts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageShell
        eyebrow="Highlights"
        title="Crafted for memorable meals and celebrations"
        description="From intimate family dinners to grand celebrations, every space at Rajdhani Palace is designed to feel warm, polished, and unmistakably Indian."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-[1.8rem] border border-gold-500/15 bg-gradient-to-b from-cream-50/8 to-transparent p-7 transition duration-300 hover:-translate-y-1 hover:border-gold-300/35"
            >
              <div className="mb-5 h-12 w-12 rounded-2xl bg-gold-400/15 ring-1 ring-gold-300/20" />
              <h2 className="font-display text-2xl text-cream-50">{item.title}</h2>
              <p className="mt-3 leading-7 text-cream-100/70">{item.description}</p>
            </div>
          ))}
        </div>
      </PageShell>

      <PageShell
        eyebrow="Popular Picks"
        title="A menu full of classics and crowd favorites"
        description="Rich gravies, smoky kebabs, fragrant biryanis, and comforting desserts make every visit feel like a special occasion."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {menuCategories.slice(0, 3).map((category) => (
            <div
              key={category.name}
              className="overflow-hidden rounded-[1.8rem] border border-gold-500/15 bg-cream-50/5"
            >
              <img
                src={category.items[0].image}
                alt={category.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-6">
                <p className="font-display text-xl text-gold-200">{category.name}</p>
                <div className="mt-5 space-y-4">
                  {category.items.slice(0, 2).map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <DishTypeBadge type={item.type} />
                        <span className="text-cream-100">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gold-200">Rs {item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageShell>

      <PageShell
        eyebrow="Guest Stories"
        title="Why Pune diners come back"
        description="Our guests return for the atmosphere, the consistency, and the feeling that every meal is hosted with care."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.author}
              className="rounded-[1.8rem] border border-gold-500/15 bg-cream-50/5 p-7"
            >
              <p className="text-lg leading-8 text-cream-100/80">"{item.quote}"</p>
              <footer className="mt-5 font-display text-lg text-gold-200">
                {item.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </PageShell>
    </>
  )
}

function MenuPage() {
  return (
    <PageShell
      eyebrow="Menu"
      title="A royal spread of Indian favorites"
      description="Explore our curated menu across starters, breads, mains, biryanis, and desserts, each prepared to bring out rich Indian flavors and comforting aromas."
    >
      <div className="space-y-10">
        {menuCategories.map((category) => (
          <section key={category.name} className="space-y-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-3xl text-gold-200">{category.name}</h2>
              <p className="text-sm uppercase tracking-[0.28em] text-cream-100/55">
                Signature selections
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item) => (
                <article
                  key={item.name}
                  className="overflow-hidden rounded-[1.8rem] border border-gold-500/15 bg-cream-50/5 transition duration-300 hover:-translate-y-1 hover:border-gold-300/35"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-60 w-full object-cover"
                  />
                  <div className="space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl text-cream-50">
                          {item.name}
                        </h3>
                        <div className="mt-3">
                          <DishTypeBadge type={item.type} label />
                        </div>
                      </div>
                      <p className="font-display text-2xl text-gold-200">
                        Rs {item.price}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  )
}

function AboutPage() {
  return (
    <PageShell
      eyebrow="About Us"
      title="Serving Pune with warmth, flavor, and celebration since 2005"
      description="Hotel Rajdhani Palace brings together classic Indian hospitality, carefully balanced recipes, and a setting made for both everyday dining and life’s special occasions."
    >
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6 text-lg leading-8 text-cream-100/75">
          <p>
            Since opening our doors in 2005, Hotel Rajdhani Palace has become a
            trusted destination in Pune for families, food lovers, and hosts
            planning memorable gatherings. Our approach combines the richness of
            North Indian cuisine with polished service and inviting interiors.
          </p>
          <p>
            Our kitchen celebrates authentic techniques, from charcoal-kissed
            tandoor starters to slow-cooked gravies and aromatic biryanis. Every
            dish is prepared with a focus on flavor, freshness, and the kind of
            generosity that makes guests feel genuinely welcomed.
          </p>
          <p>
            Whether you are joining us for a relaxed family dinner, a festive
            lunch, or a private celebration in our party hall, Rajdhani Palace
            is designed to make the experience feel refined, comfortable, and
            unforgettable.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/15 bg-cream-50/5 p-3 shadow-soft-lg">
          <img
            src={chefImage}
            alt="Chef presenting signature Indian cuisine"
            className="h-[34rem] w-full rounded-[1.5rem] object-cover"
          />
          <div className="absolute inset-x-6 bottom-6 rounded-[1.5rem] border border-gold-300/20 bg-royal-950/75 p-5 backdrop-blur-md">
            <p className="font-display text-2xl text-gold-200">Chef's Signature Touch</p>
            <p className="mt-2 text-cream-100/70">
              A menu rooted in tradition, elevated for modern dining.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  )
}

function GalleryPage() {
  const [index, setIndex] = useState(-1)
  const slides = useMemo(
    () => galleryImages.map((image) => ({ src: image.src, alt: image.alt })),
    [],
  )

  return (
    <PageShell
      eyebrow="Gallery"
      title="A closer look at our food, interiors, and celebrations"
      description="Browse signature dishes, elegant seating, and festive spaces through a masonry gallery designed to capture the spirit of Hotel Rajdhani Palace."
    >
      <div className="columns-1 gap-5 space-y-5 sm:columns-2 xl:columns-3">
        {galleryImages.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            className="group relative block w-full overflow-hidden rounded-[1.6rem] border border-gold-500/15 bg-cream-50/5 text-left"
            onClick={() => setIndex(imageIndex)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-4 bottom-4 rounded-full bg-royal-950/70 px-4 py-2 text-sm tracking-[0.18em] text-gold-100 backdrop-blur-md">
              View Photo
            </span>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
      />
    </PageShell>
  )
}

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      setIsSubmitting(true)
      await submitJson('/api/contact', payload)
      event.currentTarget.reset()
      toast.success('Your message has been sent. We will get back to you shortly.')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageShell
      eyebrow="Contact"
      title="Plan your visit to Rajdhani Palace"
      description="Visit us in Pune, call for reservations, or send us a message for private dining, events, and catering enquiries."
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[2rem] border border-gold-500/15 bg-cream-50/5 p-7">
          <ContactItem
            icon={<FiMapPin />}
            title="Address"
            content="Hotel Rajdhani Palace, FC Road, Shivajinagar, Pune, Maharashtra"
          />
          <ContactItem
            icon={<FaPhoneAlt />}
            title="Phone"
            content="+91 98765 43210"
          />
          <ContactItem
            icon={<FiMail />}
            title="Email"
            content="contact@rajdhanipalace.com"
          />
          <ContactItem
            icon={<FiClock />}
            title="Opening Hours"
            content="Daily, 11am - 11pm"
          />

          <div className="overflow-hidden rounded-[1.6rem] border border-gold-500/15">
            <iframe
              title="Rajdhani Palace Pune map"
              src="https://www.google.com/maps?q=Pune%20Maharashtra&z=13&output=embed"
              className="h-[20rem] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[2rem] border border-gold-500/15 bg-cream-50/5 p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Full Name" name="name" type="text" placeholder="Enter your name" />
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91"
            />
          </div>
          <FormField
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
          <div>
            <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-cream-100/60">
              Message
            </label>
            <textarea
              name="message"
              rows="6"
              placeholder="Tell us about your dining plan or event enquiry"
              className="w-full rounded-[1.25rem] border border-gold-500/20 bg-royal-900/60 px-4 py-3 text-cream-50 outline-none transition placeholder:text-cream-100/35 focus:border-gold-300"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-royal-950 transition hover:-translate-y-0.5 hover:bg-gold-300"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </PageShell>
  )
}

function BookTablePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      time: formData.get('time'),
      guests: formData.get('guests'),
    }

    try {
      setIsSubmitting(true)
      await submitJson('/api/reservations', payload)
      event.currentTarget.reset()
      toast.success('Table reserved successfully. We look forward to hosting you.')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageShell
      eyebrow="Book a Table"
      title="Reserve your royal dining experience"
      description="Choose your preferred date, time, and group size, and we will have your table ready for a memorable meal at Hotel Rajdhani Palace."
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-gold-500/15 bg-gradient-to-b from-gold-500/10 to-transparent p-8">
          <h2 className="font-display text-3xl text-gold-200">Reservation Details</h2>
          <p className="mt-4 leading-8 text-cream-100/72">
            Ideal for family dinners, date nights, business meals, and party
            bookings. For larger events, our team can help customize the setup
            and menu.
          </p>
          <div className="mt-8 space-y-4">
            <InfoPill label="Call us" value="+91 98765 43210" />
            <InfoPill label="Open daily" value="11am - 11pm" />
            <InfoPill label="Location" value="FC Road, Shivajinagar, Pune" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[2rem] border border-gold-500/15 bg-cream-50/5 p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Name" name="name" type="text" placeholder="Guest name" />
            <FormField label="Phone" name="phone" type="tel" placeholder="+91" />
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <FormField label="Date" name="date" type="date" />
            <FormField label="Time" name="time" type="time" />
            <FormField label="Guests" name="guests" type="number" min="1" max="20" placeholder="4" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-gold-400 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.22em] text-royal-950 transition hover:-translate-y-0.5 hover:bg-gold-300"
          >
            {isSubmitting ? 'Saving...' : 'Confirm Reservation'}
          </button>
        </form>
      </div>
    </PageShell>
  )
}

function AdminPage() {
  const [dashboard, setDashboard] = useState({
    stats: { reservations: 0, contacts: 0 },
    reservations: [],
    contacts: [],
  })
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const fetchDashboard = async () => {
      try {
        setStatus('loading')
        const result = await loadDashboard()

        if (!cancelled) {
          setDashboard(result)
          setStatus('ready')
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message)
          setStatus('error')
        }
      }
    }

    fetchDashboard()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <PageShell
      eyebrow="Admin Dashboard"
      title="Manage enquiries and reservations in one place"
      description="This dashboard reads live data from the backend so you can review table bookings and contact messages submitted through the website."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.8rem] border border-gold-500/15 bg-cream-50/5 p-7">
          <p className="text-sm uppercase tracking-[0.22em] text-cream-100/60">Reservations</p>
          <p className="mt-3 font-display text-5xl text-gold-200">
            {dashboard.stats.reservations}
          </p>
        </div>
        <div className="rounded-[1.8rem] border border-gold-500/15 bg-cream-50/5 p-7">
          <p className="text-sm uppercase tracking-[0.22em] text-cream-100/60">Messages</p>
          <p className="mt-3 font-display text-5xl text-gold-200">
            {dashboard.stats.contacts}
          </p>
        </div>
      </div>

      {status === 'loading' ? (
        <p className="mt-8 text-lg text-cream-100/70">Loading live submissions...</p>
      ) : null}

      {status === 'error' ? (
        <div className="mt-8 rounded-[1.6rem] border border-rose-400/30 bg-rose-400/10 p-5 text-rose-100">
          {error}
        </div>
      ) : null}

      {status === 'ready' ? (
        <div className="mt-10 grid gap-8 xl:grid-cols-2">
          <DashboardPanel
            title="Recent Reservations"
            emptyMessage="No table reservations have been submitted yet."
            items={dashboard.reservations}
            renderItem={(item) => (
              <>
                <div>
                  <p className="font-display text-2xl text-cream-50">{item.name}</p>
                  <p className="mt-2 text-cream-100/70">
                    {item.phone} · {item.guests} guests
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gold-200">
                    {item.date} at {item.time}
                  </p>
                  <p className="mt-2 text-sm text-cream-100/55">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </>
            )}
          />

          <DashboardPanel
            title="Recent Contact Messages"
            emptyMessage="No contact enquiries have been received yet."
            items={dashboard.contacts}
            renderItem={(item) => (
              <>
                <div>
                  <p className="font-display text-2xl text-cream-50">{item.name}</p>
                  <p className="mt-2 text-cream-100/70">{item.email}</p>
                  <p className="mt-1 text-cream-100/70">{item.phone || 'No phone added'}</p>
                </div>
                <p className="max-w-xl text-sm leading-7 text-cream-100/75">
                  {item.message}
                </p>
              </>
            )}
          />
        </div>
      ) : null}
    </PageShell>
  )
}

function DashboardPanel({ title, emptyMessage, items, renderItem }) {
  return (
    <section className="rounded-[1.8rem] border border-gold-500/15 bg-cream-50/5 p-7">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-3xl text-gold-200">{title}</h2>
        <span className="rounded-full bg-gold-500/10 px-4 py-2 text-sm uppercase tracking-[0.22em] text-gold-100">
          {items.length} items
        </span>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-cream-100/70">{emptyMessage}</p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="space-y-4 rounded-[1.4rem] border border-gold-500/10 bg-royal-900/50 p-5"
            >
              {renderItem(item)}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function DishTypeBadge({ type, label = false }) {
  const isVeg = type === 'veg'

  return (
    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-cream-100/70">
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-[0.45rem] border ${
          isVeg
            ? 'border-emerald-400/70 text-emerald-400'
            : 'border-rose-400/70 text-rose-400'
        }`}
      >
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isVeg ? 'bg-emerald-400' : 'bg-rose-400'
          }`}
        />
      </span>
      {label ? (isVeg ? 'Veg' : 'Non-Veg') : null}
    </span>
  )
}

function FormField({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-cream-100/60">
        {label}
      </label>
      <input
        {...props}
        required
        className="w-full rounded-[1.25rem] border border-gold-500/20 bg-royal-900/60 px-4 py-3 text-cream-50 outline-none transition placeholder:text-cream-100/35 focus:border-gold-300"
      />
    </div>
  )
}

function ContactItem({ icon, title, content }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-xl text-gold-300">
        {icon}
      </div>
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-cream-100/55">{title}</p>
        <p className="mt-2 text-lg leading-7 text-cream-50">{content}</p>
      </div>
    </div>
  )
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-[1.4rem] border border-gold-500/15 bg-cream-50/5 px-5 py-4">
      <p className="text-sm uppercase tracking-[0.2em] text-cream-100/55">{label}</p>
      <p className="mt-2 text-lg text-cream-50">{value}</p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-gold-500/15 bg-royal-950/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="font-display text-2xl text-gold-200">Hotel Rajdhani Palace</p>
          <p className="mt-4 max-w-md leading-8 text-cream-100/70">
            Royal ambience, authentic Indian cuisine, and warm hospitality for
            every family meal, celebration, and special event in Pune.
          </p>
          <p className="mt-5 text-cream-100/75">
            FC Road, Shivajinagar, Pune, Maharashtra
          </p>
        </div>

        <div>
          <p className="font-display text-xl text-gold-200">Quick Links</p>
          <div className="mt-4 flex flex-col gap-3">
            {siteLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-cream-100/70 transition hover:text-gold-100"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="font-display text-xl text-gold-200">Connect</p>
          <div className="mt-4 flex gap-3">
            {[FaFacebookF, FaInstagram, FaPinterestP].map((Icon, index) => (
              <a
                key={index}
                href="/"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/20 bg-cream-50/5 text-gold-200 transition hover:border-gold-300 hover:text-gold-50"
                aria-label="Social media link"
                onClick={(event) => event.preventDefault()}
              >
                <Icon />
              </a>
            ))}
          </div>
          <p className="mt-5 text-cream-100/70">contact@rajdhanipalace.com</p>
          <p className="mt-2 text-cream-100/70">+91 98765 43210</p>
          <Link to="/admin" className="mt-4 inline-block text-gold-100 transition hover:text-gold-300">
            Open admin dashboard
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default App
