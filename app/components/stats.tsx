export default function Stats() {
    const stats = [
      { label: "Total Assets", value: "$2.5B+" },
      { label: "Active Investors", value: "50K+" },
      { label: "Properties Listed", value: "500+" },
      { label: "Avg. Yield", value: "8-12%" },
    ]
  
    return (
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  