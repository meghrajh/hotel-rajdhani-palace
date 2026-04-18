import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Menu", path: "/menu" },
  { label: "About Us", path: "/about" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
  { label: "Book a Table", path: "/book-table" },
];

const highlights = [
  {
    title: "Fine Dining",
    text: "Elegant interiors, handcrafted plating, and signature curries in a royal satara setting.",
  },
  {
    title: "Family Restaurant",
    text: "A warm, spacious dining room made for celebrations, Sunday lunches, and comforting classics.",
  },
  {
    title: "Party Hall",
    text: "Host birthdays, anniversaries, and corporate gatherings with curated menus and attentive service.",
  },
];

const menuCategories = [
  {
    title: "Veg Starters",
    items: [
      {
        name: "Paneer Tikka",
        price: 280,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Hara Bhara Kebab",
        price: 240,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Crispy Corn Masala",
        price: 220,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Non-Veg Starters",
    items: [
      {
        name: "Chicken Malai Tikka",
        price: 320,
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Tandoori Prawns",
        price: 410,
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Mutton Seekh Kebab",
        price: 360,
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Main Course",
    items: [
      {
        name: "Paneer Butter Masala",
        price: 300,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Butter Chicken",
        price: 360,
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1603893662172-99ed0cea2a08?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Dal Makhani",
        price: 260,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Indian Breads",
    items: [
      {
        name: "Butter Naan",
        price: 50,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Garlic Kulcha",
        price: 70,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1600628421066-f6bda6a7b976?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Tandoori Roti",
        price: 35,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Rice & Biryani",
    items: [
      {
        name: "Chicken Biryani",
        price: 350,
        type: "non-veg",
        image:
          "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Veg Dum Biryani",
        price: 290,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1701579231373-f7f2d8ebcb18?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Jeera Rice",
        price: 170,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "Gulab Jamun",
        price: 120,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Rasmalai",
        price: 140,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1704292697215-7f4e6a0eef15?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Kulfi Falooda",
        price: 160,
        type: "veg",
        image:
          "https://images.unsplash.com/photo-1631452180239-903f2a52f05b?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80",
    alt: "Luxurious dining hall",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    alt: "Restaurant interior with warm lighting",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    alt: "Signature kebab platter",
  },
  {
    src: "https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=900&q=80",
    alt: "Elegant table setup",
  },
  {
    src: "https://images.unsplash.com/photo-1604908176997-431cb0b67f04?auto=format&fit=crop&w=900&q=80",
    alt: "Rich Indian curry spread",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
    alt: "Festive party hall decor",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    alt: "Dessert selection",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    alt: "Family dining ambiance",
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-royal-glow opacity-95" />
        <div className="absolute left-[-8rem] top-[18rem] h-72 w-72 rounded-full bg-gold-200/25 blur-3xl" />
        <div className="absolute right-[-8rem] top-[26rem] h-80 w-80 rounded-full bg-maroon-300/20 blur-3xl" />
      </div>
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="pb-16 pt-24">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book-table" element={<BookTablePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-maroon-900/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-300/60 bg-gold-100/10">
            <span className="font-heading text-2xl font-bold text-gold-200">R</span>
          </div>
          <div>
            <p className="font-heading text-2xl font-semibold tracking-wide text-white">
              Hotel Rajdhani Palace
            </p>
            <p className="text-xs uppercase tracking-[0.35em] text-gold-200">
              Authentic Taste of India
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavItem key={link.path} link={link} />
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black-300/30 text-black-200 md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
            <path d={mobileMenuOpen ? "M6 6L18 18M6 18L18 6" : "M4 7H20M4 12H20M4 17H20"} />
          </svg>
        </button>
      </div>

      {mobileMenuOpen ? (
        <nav className="border-t border-black/10 bg-maroon-950/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    "rounded-2xl px-4 py-3 text-sm font-medium transition",
                    isActive
                      ? "bg-gold-300 text-maroon-900"
                      : "text-white/85 hover:bg-white/5 hover:text-gold-100",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function NavItem({ link }) {
  return (
    <NavLink
      to={link.path}
      className={({ isActive }) =>
        [
          "text-sm font-semibold uppercase tracking-[0.22em] transition-colors",
          isActive ? "text-gold-200" : "text-white/80 hover:text-gold-100",
        ].join(" ")
      }
    >
      {link.label}
    </NavLink>
  );
}

function HomePage() {
  return (
    <div className="space-y-24">
      <section className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="mb-5 inline-flex w-fit items-center rounded-full border border-gold-300/30 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-maroon-700">
            satara's Royal Dining Destination
          </span>
          <h1 className="font-heading text-5xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">
            Hotel Rajdhani Palace
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cream/90">
            Authentic Taste of India served with regal hospitality, rich flavors, and a setting designed
            for memorable family dinners, celebrations, and elegant evenings out.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center rounded-full bg-gold-300 px-7 py-4 text-sm font-bold uppercase tracking-[0.25em] text-maroon-900 transition hover:-translate-y-0.5 hover:bg-gold-200"
            >
              View Menu
            </Link>
            <Link
              to="/book-table"
              className="inline-flex items-center justify-center rounded-full border border-gold-200/60 px-7 py-4 text-sm font-bold uppercase tracking-[0.25em] text-gold-100 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Reserve Table
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-8 h-24 w-24 rounded-full border border-gold-300/40" />
          <div className="absolute -right-4 bottom-8 h-28 w-28 rounded-full bg-gold-200/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-royal">
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
              alt="Hotel Rajdhani Palace dining room"
              className="h-[28rem] w-full object-cover sm:h-[34rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-heading text-3xl">Serving royal feasts, family moments, and festive nights.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <article
              key={highlight.title}
              className="group rounded-[1.75rem] border border-maroon-200/60 bg-white/65 p-8 shadow-lg shadow-maroon-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-royal"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-maroon-900 text-gold-200">
                <span className="font-heading text-2xl">{index + 1}</span>
              </div>
              <h2 className="font-heading text-3xl font-semibold text-maroon-900">{highlight.title}</h2>
              <p className="mt-3 text-base leading-7 text-charcoal/75">{highlight.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-maroon-950 px-6 py-8 text-black shadow-royal md:grid-cols-[0.95fr_1.05fr] md:px-10 md:py-10">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
            alt="Party setup at Hotel Rajdhani Palace"
            className="h-full min-h-[22rem] w-full rounded-[1.5rem] object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm uppercase tracking-[0.35em] text-gold-200">Celebrate with us</p>
            <h2 className="mt-4 font-heading text-4xl font-semibold sm:text-5xl">
              Royal hospitality for every gathering
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80">
              Whether you are planning a cozy dinner, a family get-together, or a grand celebration in our
              party hall, our team crafts menus and service experiences around your occasion.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="rounded-full border border-gold-200/40 px-6 py-3 text-sm font-bold uppercase tracking-[0.22em] text-gold-100 transition hover:bg-white/10"
              >
                Contact Us
              </Link>
              <Link
                to="/gallery"
                className="rounded-full bg-white px-6 py-3 text-sm font-bold uppercase tracking-[0.22em] text-maroon-900 transition hover:bg-gold-100"
              >
                Explore Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MenuPage() {
  return (
    <PageFrame
      eyebrow="Curated Menu"
      title="Handpicked flavors from our royal kitchen"
      description="Classic Indian comfort food, smoky tandoor favorites, aromatic biryanis, and indulgent desserts served with a touch of palace-style grandeur."
    >
      <div className="space-y-12">
        {menuCategories.map((category) => (
          <section key={category.title} className="space-y-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-maroon-500">Category</p>
                <h2 className="font-heading text-4xl font-semibold text-maroon-900">{category.title}</h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item) => (
                <article
                  key={item.name}
                  className="overflow-hidden rounded-[1.75rem] border border-maroon-100 bg-white shadow-lg shadow-maroon-900/5"
                >
                  <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />
                  <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <FoodTypeIcon type={item.type} />
                          <h3 className="font-heading text-2xl font-semibold text-maroon-900">{item.name}</h3>
                        </div>
                        <p className="mt-2 text-sm uppercase tracking-[0.25em] text-charcoal/45">
                          {item.type === "veg" ? "Vegetarian" : "Non-Vegetarian"}
                        </p>
                      </div>
                      <span className="rounded-full bg-gold-100 px-4 py-2 text-sm font-bold text-gold-700">
                        Rs. {item.price}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageFrame>
  );
}

function AboutPage() {
  return (
    <PageFrame
      eyebrow="About Us"
      title="A Pune landmark for warm hospitality and timeless Indian flavors"
      description="Hotel Rajdhani Palace blends heritage-inspired interiors with thoughtful service to create a dining destination that feels both celebratory and comforting."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-6 text-lg leading-8 text-charcoal/80">
          <p>
            Since 2005, Hotel Rajdhani Palace has welcomed guests in satara with a promise of rich Indian
            cuisine, attentive service, and spaces designed to make every meal feel special. From weekday
            lunches to festive dinners, our team brings care and consistency to every plate.
          </p>
          <p>
            Inspired by the grandeur of royal Indian dining halls, our restaurant pairs plush interiors,
            warm lighting, and thoughtfully curated menus. Each dish celebrates familiar flavors while
            emphasizing freshness, aroma, and presentation worthy of a memorable evening out.
          </p>
          <p>
            Families return for our welcoming atmosphere, food lovers come for our tandoor and biryani
            selections, and event hosts rely on our party hall to turn gatherings into elegant experiences.
            At Hotel Rajdhani Palace, hospitality is not just service, it is tradition.
          </p>
          <div className="inline-flex rounded-full border border-gold-300/40 bg-gold-50 px-5 py-3 text-sm font-bold uppercase tracking-[0.28em] text-maroon-800">
            Serving since 2009
          </div>
        </div>

        <div className="space-y-6">
          <img
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1200&q=80"
            alt="Head chef of Hotel Rajdhani Palace"
            className="h-[32rem] w-full rounded-[2rem] object-cover shadow-royal"
          />
          <div className="rounded-[1.75rem] border border-maroon-100 bg-white p-6 shadow-lg shadow-maroon-900/5">
            <p className="text-sm uppercase tracking-[0.3em] text-maroon-500">Kitchen Philosophy</p>
            <p className="mt-3 text-base leading-7 text-charcoal/75">
              Our chefs focus on balanced spice, slow-cooked gravies, freshly baked breads, and seasonal
              ingredients that keep every dish vibrant, comforting, and unmistakably Indian.
            </p>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

function GalleryPage() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <PageFrame
      eyebrow="Gallery"
      title="Spaces, plates, and celebrations worth savoring"
      description="Explore the signature look and feel of Hotel Rajdhani Palace through interiors, festive tables, and mouthwatering Indian favorites."
    >
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {galleryImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="group relative mb-5 block w-full overflow-hidden rounded-[1.5rem] bg-maroon-950"
            onClick={() => setActiveImage(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full break-inside-avoid rounded-[1.5rem] object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
            />
            <span className="absolute inset-x-4 bottom-4 rounded-full bg-black/45 px-4 py-2 text-left text-sm font-medium text-black opacity-0 backdrop-blur transition group-hover:opacity-100">
              {image.alt}
            </span>
          </button>
        ))}
      </div>

      {activeImage !== null ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 px-4 py-10" onClick={() => setActiveImage(null)}>
          <div className="relative max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-charcoal"
              onClick={() => setActiveImage(null)}
              aria-label="Close image"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M6 6L18 18M6 18L18 6" />
              </svg>
            </button>
            <img
              src={galleryImages[activeImage].src}
              alt={galleryImages[activeImage].alt}
              className="max-h-[80vh] rounded-[2rem] object-contain"
            />
            <p className="mt-4 text-center text-sm uppercase tracking-[0.28em] text-black/80">
              {galleryImages[activeImage].alt}
            </p>
          </div>
        </div>
      ) : null}
    </PageFrame>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setFormData({ name: "", email: "", message: "" });
    window.setTimeout(() => setSent(false), 3000);
  };

  return (
    <PageFrame
      eyebrow="Contact"
      title="Plan your next meal, event, or celebration"
      description="Reach out for reservations, private dining, family gatherings, or party hall bookings. We're open every day to welcome you with warmth."
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6 rounded-[2rem] bg-maroon-950 p-7 text-black shadow-royal">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-gold-200">Visit Us</p>
            <h2 className="mt-3 font-heading text-4xl font-semibold">Hotel Rajdhani Palace, satara</h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-black/80">
            <p>satara pandharpur Road, pusegon, , Maharashtra 415502</p>
            <p>Phone: +91 9960302671</p>
            <p>Email: rajdhanipalace07@gmail.com</p>
            <p>Opening Hours: 11am - 11pm</p>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10">
            <iframe
              title="Hotel Rajdhani Palace map"
              src="https://maps.app.goo.gl/i4feTnFVDjuXcAMMA?g_st=aw"
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-maroon-100 bg-white p-7 shadow-lg shadow-maroon-900/5">
          <h2 className="font-heading text-4xl font-semibold text-maroon-900">Send us a message</h2>
          <p className="mt-3 text-base leading-7 text-charcoal/70">
            Share your event details, reservation preferences, or any questions and our team will reach out.
          </p>
          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              value={formData.name}
              onChange={(value) => setFormData((current) => ({ ...current, name: value }))}
            />
            <InputField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData((current) => ({ ...current, email: value }))}
            />
            <label className="block">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-maroon-700">
                Message
              </span>
              <textarea
                rows="5"
                value={formData.message}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, message: event.target.value }))
                }
                className="w-full rounded-[1.25rem] border border-maroon-100 bg-cream px-4 py-3 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
                placeholder="Tell us about your reservation or event"
                required
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-maroon-900 px-7 py-4 text-sm font-bold uppercase tracking-[0.24em] text-gold-100 transition hover:-translate-y-0.5 hover:bg-maroon-800"
            >
              Send Message
            </button>
          </form>
          {sent ? (
            <p className="mt-4 rounded-2xl bg-gold-50 px-4 py-3 text-sm font-semibold text-maroon-800">
              Thank you. Your message has been received.
            </p>
          ) : null}
        </div>
      </div>
    </PageFrame>
  );
}

function BookTablePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowToast(true);
    setFormData({
      name: "",
      phone: "",
      date: "",
      time: "",
      guests: "2",
    });
    window.setTimeout(() => setShowToast(false), 3200);
  };

  return (
    <PageFrame
      eyebrow="Book a Table"
      title="Reserve your royal dining experience"
      description="Pick your preferred date, time, and group size and we'll be ready with a table that suits your celebration, family outing, or intimate dinner."
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 rounded-[2rem] bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 p-8 text-white shadow-royal">
          <p className="text-sm uppercase tracking-[0.32em] text-gold-200">Reservation Benefits</p>
          <h2 className="font-heading text-4xl font-semibold">Plan ahead for your perfect table</h2>
          <div className="space-y-4 text-base leading-8 text-white/80">
            <p>Priority seating for families, couples, and celebrations.</p>
            <p>Dedicated support for party hall reservations and larger groups.</p>
            <p>Freshly prepared dishes and a setting tailored to your occasion.</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
            alt="Private dining and celebration setup"
            className="h-64 w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div className="rounded-[2rem] border border-maroon-100 bg-white p-7 shadow-lg shadow-maroon-900/5">
          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <InputField
                label="Name"
                value={formData.name}
                onChange={(value) => setFormData((current) => ({ ...current, name: value }))}
              />
            </div>
            <InputField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(value) => setFormData((current) => ({ ...current, phone: value }))}
            />
            <InputField
              label="Date"
              type="date"
              value={formData.date}
              onChange={(value) => setFormData((current) => ({ ...current, date: value }))}
            />
            <InputField
              label="Time"
              type="time"
              value={formData.time}
              onChange={(value) => setFormData((current) => ({ ...current, time: value }))}
            />
            <label className="block">
              <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-maroon-700">
                Guests
              </span>
              <select
                value={formData.guests}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, guests: event.target.value }))
                }
                className="w-full rounded-[1.25rem] border border-maroon-100 bg-cream px-4 py-3 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
              >
                {[2, 4, 6, 8, 10, 12].map((option) => (
                  <option key={option} value={option}>
                    {option} Guests
                  </option>
                ))}
              </select>
            </label>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-full bg-maroon-900 px-7 py-4 text-sm font-bold uppercase tracking-[0.24em] text-gold-100 transition hover:-translate-y-0.5 hover:bg-maroon-800"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        </div>
      </div>

      {showToast ? (
        <div className="fixed bottom-6 right-6 z-[70] rounded-2xl bg-maroon-900 px-5 py-4 text-sm font-semibold text-gold-100 shadow-royal">
          Table reserved successfully. We look forward to hosting you.
        </div>
      ) : null}
    </PageFrame>
  );
}

function InputField({ label, type = "text", value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-maroon-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[1.25rem] border border-maroon-100 bg-cream px-4 py-3 outline-none transition focus:border-gold-400 focus:ring-2 focus:ring-gold-200"
        required
      />
    </label>
  );
}

function FoodTypeIcon({ type }) {
  const isVeg = type === "veg";

  return (
    <span
      className={[
        "inline-flex h-5 w-5 items-center justify-center rounded-sm border",
        isVeg ? "border-green-600" : "border-red-600",
      ].join(" ")}
      aria-label={isVeg ? "Vegetarian item" : "Non-vegetarian item"}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    >
      <span className={["h-2.5 w-2.5 rounded-full", isVeg ? "bg-green-600" : "bg-red-600"].join(" ")} />
    </span>
  );
}

function PageFrame({ eyebrow, title, description, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-maroon-500">{eyebrow}</p>
        <h1 className="mt-4 font-heading text-5xl font-semibold text-maroon-900 sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-charcoal/75">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-maroon-100 bg-maroon-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="font-heading text-4xl font-semibold text-gold-200">Hotel Rajdhani Palace</p>
          <p className="mt-4 max-w-md text-base leading-7 text-white/75">
            Royal Indian dining in satara with memorable food, warm service, and a versatile party hall for
            life's celebrations.
          </p>
          <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gold-200">
            Satara pandharpur rode, pusegon, Satara 
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold-300">Quick Links</p>
          <div className="mt-5 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="text-black/75 transition hover:text-gold-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-gold-300">Connect</p>
          <div className="mt-5 flex gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/5 transition hover:border-red-200/40 hover:text-red-100"
                aria-label={link.label}
              >
                <SocialIcon label={link.label} />
              </a>
            ))}
          </div>
          <p className="mt-5 text-black/75">Open daily: 11am - 11pm</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ label }) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.5 1.6-1.5H17V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V10H8v3h2.4v8h3.1Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M23 7.2a2.9 2.9 0 0 0-2-2C19.2 4.7 12 4.7 12 4.7s-7.2 0-9 .5a2.9 2.9 0 0 0-2 2C.5 9 .5 12 .5 12s0 3 .5 4.8a2.9 2.9 0 0 0 2 2c1.8.5 9 .5 9 .5s7.2 0 9-.5a2.9 2.9 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8ZM9.7 15.4V8.6l6 3.4-6 3.4Z" />
    </svg>
  );
}

export default App;
