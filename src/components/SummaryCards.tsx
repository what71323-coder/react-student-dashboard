import type { SummaryCardsProps } from "../types/student";

function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      icon: "👨‍🎓",
      className: "total"
    },
    {
      title: "Active Students",
      value: stats.activeStudents,
      icon: "✅",
      className: "active"
    },
    {
      title: "Inactive Students",
      value: stats.inactiveStudents,
      icon: "⏸️",
      className: "inactive"
    },
    {
      title: "Pending Students",
      value: stats.pendingStudents,
      icon: "⏳",
      className: "pending"
    }
  ];

  return (
    <section className="summary-grid">
      {cards.map((card) => (
        <div className={`summary-card ${card.className}`} key={card.title}>
          <div className="summary-icon">{card.icon}</div>
          <p>{card.title}</p>
          <h2>{card.value}</h2>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;
