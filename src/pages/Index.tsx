import { useState } from "react";
import { Activity, Heart, Sparkles, ShieldCheck, TrendingUp, Calendar, Users, MapPin, User, Loader2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { predictCost, formatINR, formatUSD, type PredictionInput, type PredictionResult, type Gender, type Smoker, type Region } from "@/lib/predict";

interface FormState {
  age: string;
  gender: Gender | "";
  bmi: string;
  children: string;
  smoker: Smoker | "";
  region: Region | "";
}

const initialForm: FormState = {
  age: "",
  gender: "",
  bmi: "",
  children: "",
  smoker: "",
  region: "",
};

const Index = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const age = Number(form.age);
    const bmi = Number(form.bmi);
    const children = Number(form.children);

    if (!form.age || !form.gender || !form.bmi || form.children === "" || !form.smoker || !form.region) {
      toast({ title: "Missing fields", description: "Please fill out every field to get a prediction." });
      return;
    }
    if (age < 1 || age > 120) {
      toast({ title: "Invalid age", description: "Age must be between 1 and 120." });
      return;
    }
    if (bmi < 10 || bmi > 70) {
      toast({ title: "Invalid BMI", description: "BMI must be between 10 and 70." });
      return;
    }
    if (children < 0 || children > 15) {
      toast({ title: "Invalid children count", description: "Please enter a value between 0 and 15." });
      return;
    }

    const input: PredictionInput = {
      age,
      gender: form.gender as Gender,
      bmi,
      children,
      smoker: form.smoker as Smoker,
      region: form.region as Region,
    };

    setLoading(true);
    // Simulate brief compute for nice UX
    setTimeout(() => {
      const r = predictCost(input);
      setResult(r);
      setLoading(false);
      requestAnimationFrame(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 600);
  };

  const handleReset = () => {
    setForm(initialForm);
    setResult(null);
  };

  const riskGradient =
    result?.riskLevel === "Low"
      ? "gradient-success"
      : result?.riskLevel === "Medium"
      ? "gradient-warning"
      : "gradient-danger";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container pt-6">
        <nav className="glass shadow-soft rounded-2xl flex items-center justify-between px-5 py-3 md:px-7 md:py-4">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="gradient-primary shadow-glow rounded-xl p-2 text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight md:text-xl">
              MediCost <span className="gradient-text">AI</span>
            </span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            <a href="#predictor" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground">Predictor</a>
            <a href="#how" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground">How it works</a>
            <a href="#about" className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground">About</a>
          </div>
          <Button asChild size="sm" className="gradient-primary border-0 shadow-glow text-primary-foreground hover:opacity-90">
            <a href="#predictor">Try it now</a>
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="container pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by Random Forest ML · 87% accuracy
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-6xl">
            Predict your medical insurance cost,{" "}
            <span className="gradient-text">in seconds</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
            Get an instant, data-driven estimate of your annual health insurance charges based on your age, lifestyle and region — no signup required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="gradient-primary border-0 shadow-glow text-primary-foreground hover:opacity-90">
              <a href="#predictor"><Activity className="mr-2 h-4 w-4" /> Start prediction</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <a href="#how">Learn more</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Main predictor */}
      <main id="predictor" className="container pb-16">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="glass shadow-elevated animate-scale-in rounded-3xl p-6 md:p-10 lg:col-span-3"
          >
            <div className="mb-7">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                <Heart className="mr-2 inline h-7 w-7 text-primary" />
                Your details
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Fill in the six fields below to get your prediction.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Age */}
              <div className="space-y-1.5">
                <Label htmlFor="age" className="flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={120}
                  placeholder="e.g. 32"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  className="h-12 rounded-xl border-2 bg-background/50 transition-smooth focus-visible:border-primary"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <User className="h-3.5 w-3.5 text-primary" /> Gender
                </Label>
                <Select value={form.gender} onValueChange={(v) => update("gender", v as Gender)}>
                  <SelectTrigger className="h-12 rounded-xl border-2 bg-background/50 transition-smooth data-[state=open]:border-primary">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* BMI */}
              <div className="space-y-1.5">
                <Label htmlFor="bmi" className="flex items-center gap-1.5 text-sm font-medium">
                  <Activity className="h-3.5 w-3.5 text-primary" /> BMI
                </Label>
                <Input
                  id="bmi"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min={10}
                  max={70}
                  placeholder="e.g. 24.5"
                  value={form.bmi}
                  onChange={(e) => update("bmi", e.target.value)}
                  className="h-12 rounded-xl border-2 bg-background/50 transition-smooth focus-visible:border-primary"
                />
              </div>

              {/* Children */}
              <div className="space-y-1.5">
                <Label htmlFor="children" className="flex items-center gap-1.5 text-sm font-medium">
                  <Users className="h-3.5 w-3.5 text-primary" /> Children
                </Label>
                <Input
                  id="children"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={15}
                  placeholder="e.g. 2"
                  value={form.children}
                  onChange={(e) => update("children", e.target.value)}
                  className="h-12 rounded-xl border-2 bg-background/50 transition-smooth focus-visible:border-primary"
                />
              </div>

              {/* Smoker */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-primary" /> Smoker
                </Label>
                <Select value={form.smoker} onValueChange={(v) => update("smoker", v as Smoker)}>
                  <SelectTrigger className="h-12 rounded-xl border-2 bg-background/50 transition-smooth data-[state=open]:border-primary">
                    <SelectValue placeholder="Do you smoke?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Region */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Region
                </Label>
                <Select value={form.region} onValueChange={(v) => update("region", v as Region)}>
                  <SelectTrigger className="h-12 rounded-xl border-2 bg-background/50 transition-smooth data-[state=open]:border-primary">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="northeast">Northeast</SelectItem>
                    <SelectItem value="northwest">Northwest</SelectItem>
                    <SelectItem value="southeast">Southeast</SelectItem>
                    <SelectItem value="southwest">Southwest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                disabled={loading}
                size="lg"
                className="gradient-primary h-14 flex-1 rounded-2xl border-0 text-base font-semibold text-primary-foreground shadow-glow transition-bounce hover:opacity-95 hover:shadow-elevated disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analysing…
                  </>
                ) : (
                  <>
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Predict cost
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="h-14 rounded-2xl border-2 sm:w-32"
              >
                Reset
              </Button>
            </div>
          </form>

          {/* Result panel */}
          <aside id="results" className="lg:col-span-2">
            {result ? (
              <div className="animate-scale-in space-y-4">
                <div className={`${riskGradient} relative overflow-hidden rounded-3xl p-7 text-white shadow-elevated`}>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative">
                    <div className="text-xs font-medium uppercase tracking-wider opacity-90">
                      Estimated annual cost
                    </div>
                    <div className="mt-2 font-display text-4xl font-extrabold leading-tight md:text-5xl">
                      {formatINR(result.inr)}
                    </div>
                    <div className="mt-1 text-sm opacity-90">
                      ≈ {formatINR(result.monthlyInr)} / month · {formatUSD(result.usd)}
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold backdrop-blur">
                      <ShieldCheck className="h-4 w-4" />
                      {result.riskLevel} risk · {result.confidence}% confidence
                    </div>
                  </div>
                </div>

                <div className="glass shadow-soft rounded-3xl p-6">
                  <h3 className="font-display text-base font-semibold">What drives your cost</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Relative impact of each factor on your prediction.
                  </p>
                  <div className="mt-4 space-y-3">
                    {result.drivers.map((d) => (
                      <div key={d.label}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground">{d.label}</span>
                          <span className="text-muted-foreground">{d.impact}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="gradient-primary h-full rounded-full transition-all duration-700"
                            style={{ width: `${d.impact}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass shadow-soft flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl p-8 text-center">
                <div className="gradient-primary shadow-glow animate-float mb-5 rounded-2xl p-5 text-primary-foreground">
                  <Activity className="h-10 w-10" />
                </div>
                <h3 className="font-display text-xl font-bold">Your prediction will appear here</h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Fill out the form and hit <span className="font-medium text-foreground">Predict cost</span> to see your estimated annual medical insurance charges.
                </p>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* How it works */}
      <section id="how" className="container pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            Three simple steps from input to insight.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: User, title: "Enter your details", body: "Six quick fields: age, gender, BMI, children, smoking status, region." },
            { icon: Sparkles, title: "Model crunches the data", body: "A Random Forest trained on 1,300+ real medical insurance records analyses your inputs." },
            { icon: ShieldCheck, title: "Get your estimate", body: "Instant cost prediction in ₹ and $, plus a risk level and the factors driving it." },
          ].map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="glass shadow-soft hover:shadow-elevated group rounded-3xl p-6 transition-smooth"
            >
              <div className="gradient-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground shadow-glow transition-bounce group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">Step {i + 1}</div>
              <h3 className="mt-1 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="container pb-20">
        <div className="glass shadow-elevated rounded-3xl p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                About <span className="gradient-text">MediCost AI</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                MediCost AI predicts annual medical insurance charges using a Random Forest model trained on the public Kaggle insurance dataset (1,338 records). The model achieves an R² of approximately 0.87, identifying smoking status, BMI and age as the strongest cost drivers.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                This tool is for educational and demonstration purposes only — it does not replace a real insurance quote.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Real-time predictions",
                "Mobile responsive",
                "Input validation",
                "Risk assessment",
                "Cost in ₹ and $",
                "Driver breakdown",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2.5 rounded-2xl border border-border bg-background/50 px-4 py-3 text-sm font-medium"
                >
                  <span className="gradient-success flex h-6 w-6 items-center justify-center rounded-full text-xs text-white">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container pb-10">
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-primary" />
            <span>MediCost AI · Built with React + ML</span>
          </div>
          <div>© {new Date().getFullYear()} MediCost AI. For educational use only.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
