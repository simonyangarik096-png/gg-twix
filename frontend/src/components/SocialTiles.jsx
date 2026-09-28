export default function SocialTiles({ items = [], title = '' }) {
  if (!items.length) return null;

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      {title && (
        <h3 className="text-2xl md:text-3xl font-black text-center mb-2">
          {title}
        </h3>
      )}

      <ul className="social-tiles">
        {items.map((s, i) => (
          <li
            key={i}
            style={{
              '--color': s.color,
              '--before': s.before,
              '--after': s.after
            }}
          >
            <a href={s.href} target="_blank" rel="noreferrer">
              <i className={`fa-brands ${s.icon}`} aria-hidden="true"></i>
              <span>{s.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}