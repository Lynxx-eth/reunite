export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg2/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl gold-gradient text-[#1a1204]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 21s-7-4.35-7-10a7 7 0 0114 0c0 5.65-7 10-7 10z" strokeLinejoin="round" />
                <circle cx="12" cy="11" r="2.5" />
              </svg>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Reunite</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            A global awareness network for missing children and adults. Every share matters.
          </p>
        </div>

        <div className="text-sm text-muted">
          <p>
            Case data courtesy of the{" "}
            <a
              href="https://www.fbi.gov/wanted/kidnap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue hover:underline"
            >
              FBI Missing Persons database
            </a>
            .
          </p>
          <p className="mt-1">
            This is an independent awareness project and is not affiliated with any government agency.
          </p>
          <p className="mt-3 text-muted/70">© {new Date().getFullYear()} Reunite. Made with care.</p>
        </div>
      </div>
    </footer>
  );
}
