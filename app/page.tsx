// TEMPORARY token preview: replace once the real homepage content exists.
const swatches = [
  { name: "Warm ivory", var: "--color-ivory" },
  { name: "Soft paper", var: "--color-paper" },
  { name: "Primary ink", var: "--color-ink" },
  { name: "Secondary text", var: "--color-ink-secondary" },
  { name: "Subtle border", var: "--color-border" },
  { name: "Butter yellow", var: "--color-butter" },
  { name: "Golden yellow", var: "--color-golden" },
  { name: "Olive green", var: "--color-olive" },
  { name: "Earth brown", var: "--color-earth" },
  { name: "Raspberry", var: "--color-raspberry" },
  { name: "Cobalt", var: "--color-cobalt" },
  { name: "Tomato", var: "--color-tomato" },
  { name: "Leaf green", var: "--color-leaf" },
];

export default function Home() {
  return (
    <main className="surface-main" aria-label="Design token preview">
      <p
        className="text-xs uppercase tracking-[0.2em]"
        style={{ color: "var(--color-ink-secondary)" }}
      >
        Design system preview
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
        Canvas, surface and tokens
      </h1>
      <p
        className="mt-6 max-w-xl text-lg"
        style={{ color: "var(--color-ink-secondary)" }}
      >
        The warm beige canvas with its faint grain surrounds this ivory page.
        Resize the window: the outer margin shrinks on small screens.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button className="btn btn-primary">Primary button</button>
        <button className="btn">Secondary button</button>
        <a href="#" className="btn link-subtle">
          Subtle link
        </a>
      </div>

      <h2
        className="text-xs uppercase tracking-[0.2em]"
        style={{
          marginTop: "var(--section-space)",
          color: "var(--color-ink-secondary)",
        }}
      >
        Colour tokens
      </h2>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {swatches.map((s) => (
          <li
            key={s.var}
            className="overflow-hidden"
            style={{
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <div className="h-16" style={{ background: `var(${s.var})` }} />
            <div className="p-3 text-sm">
              <div className="font-medium">{s.name}</div>
              <code style={{ color: "var(--color-ink-secondary)" }}>
                {s.var}
              </code>
            </div>
          </li>
        ))}
      </ul>

      <div
        className="mt-16 p-6"
        style={{
          background: "var(--color-paper)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <p>
          Active-state indicator:{" "}
          <span
            className="inline-block size-2 rounded-full align-middle"
            style={{ background: "var(--env-accent)" }}
          />{" "}
          golden dot. Tab to the buttons to see the focus ring.
        </p>
      </div>
    </main>
  );
}
