interface AuroraBackgroundProps {
  className?: string;
  dense?: boolean;
}

/** Fixed gradient-mesh / aurora backdrop: blurred, slowly drifting color blobs + noise. */
export function AuroraBackground({ className, dense = false }: AuroraBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden noise-overlay ${className ?? ""}`}>
      <div
        className="absolute -top-32 left-[8%] h-[32rem] w-[32rem] animate-float-slow rounded-full opacity-40 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgb(var(--primary) / 0.55), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 right-[4%] h-[28rem] w-[28rem] animate-float-slower rounded-full opacity-30 blur-[110px]"
        style={{ background: "radial-gradient(circle, rgb(var(--accent) / 0.5), transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-8rem] left-1/3 h-[26rem] w-[26rem] animate-float-slow rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, rgb(var(--secondary) / 0.5), transparent 70%)" }}
      />
      {dense && (
        <div
          className="absolute inset-0 animate-aurora opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(120deg, rgb(var(--primary)), rgb(var(--accent)), rgb(var(--secondary)), rgb(var(--primary)))",
            backgroundSize: "300% 300%",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
