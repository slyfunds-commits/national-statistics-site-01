// data.js — the one numbers table for UK Figures.
//
// Every figure on this site is rendered from this file alone. Nothing is
// written twice, so no figure can contradict itself across pages. Each figure
// was checked against its named source at build time (25 November 2025) and
// carries the period it covers. Nothing here was published after that date:
// figures released later are not used as "latest".
//
// Country: United Kingdom. Sources: Office for National Statistics (ONS),
// Bank of England, NHS England. All figures are official statistics.

export const SITE = {
  name: "UK Figures",
  tagline: "The United Kingdom in numbers",
  intro:
    "Fourteen headline numbers, eight subjects, one table of figures. " +
    "Every number on this site comes from an official release and is shown " +
    "with its source and the period it covers.",
  asOf: "Figures as published to 25 November 2025",
  vintageNote:
    "This site shows figures as published up to 25 November 2025. " +
    "A release dated after that day is not used here, even when it revises " +
    "an earlier number.",
  affiliation:
    "UK Figures is an independent guide. It is not affiliated with the " +
    "Office for National Statistics, the Bank of England or NHS England. " +
    "Figures are facts from their releases; the words and design are ours.",
};

// Sources, keyed so every figure cites the same record everywhere.
export const SOURCES = {
  ons_cpi: {
    publisher: "Office for National Statistics",
    title: "Consumer price inflation, UK: October 2025",
    released: "19 November 2025",
    covers: "CPI and CPIH annual inflation",
  },
  ons_labour: {
    publisher: "Office for National Statistics",
    title: "Labour market overview, UK: November 2025",
    released: "11 November 2025",
    covers: "Unemployment, employment and inactivity, July to September 2025",
  },
  ons_unemployment_series: {
    publisher: "Office for National Statistics",
    title: "Unemployment rate (aged 16 and over, seasonally adjusted), time series MGSX",
    released: "11 November 2025",
    covers: "Annual average unemployment rates, 2020 to 2024",
  },
  ons_gdp: {
    publisher: "Office for National Statistics",
    title: "GDP first quarterly estimate, UK: July to September 2025",
    released: "13 November 2025",
    covers: "Quarterly and annual GDP growth",
  },
  bank_rate: {
    publisher: "Bank of England",
    title: "Monetary Policy Committee decision, November 2025",
    released: "6 November 2025",
    covers: "Bank Rate and the vote to hold it at 4.00%",
  },
  ons_population: {
    publisher: "Office for National Statistics",
    title: "Population estimates for the UK, England, Wales, Scotland and Northern Ireland: mid-2024",
    released: "26 September 2025",
    covers: "Mid-year population estimates and the four nations",
  },
  ons_life_tables: {
    publisher: "Office for National Statistics",
    title: "National life tables — life expectancy in the UK: 2021 to 2023",
    released: "March 2025",
    covers: "Period life expectancy at birth and at age 65, UK and nations",
  },
  nhs_rtt: {
    publisher: "NHS England",
    title: "Referral to treatment waiting times, September 2025",
    released: "13 November 2025",
    covers: "RTT pathways waiting to start consultant-led treatment, England",
  },
  ons_neet: {
    publisher: "Office for National Statistics",
    title: "Young people not in education, employment or training (NEET), UK: November 2025",
    released: "20 November 2025",
    covers: "NEET rate and number, ages 16 to 24, July to September 2025",
  },
  ons_awe: {
    publisher: "Office for National Statistics",
    title: "Average weekly earnings in Great Britain: November 2025",
    released: "11 November 2025",
    covers: "Regular and total pay growth and average pay levels",
  },
  ons_vacancies: {
    publisher: "Office for National Statistics",
    title: "Vacancies and jobs in the UK: October 2025",
    released: "14 October 2025",
    covers: "Vacancies, July to September 2025, and the 2022 peak",
  },
  ons_trade: {
    publisher: "Office for National Statistics",
    title: "UK trade: September 2025",
    released: "14 November 2025",
    covers: "Trade in goods and services, Quarter 3 2025",
  },
  ons_public_finances: {
    publisher: "Office for National Statistics",
    title: "Public sector finances, UK: October 2025",
    released: "21 November 2025",
    covers: "Public sector net debt and borrowing",
  },
  ons_house_prices: {
    publisher: "Office for National Statistics",
    title: "UK House Price Index: September 2025",
    released: "19 November 2025",
    covers: "Average house prices, UK and nations",
  },
  ons_rents: {
    publisher: "Office for National Statistics",
    title: "Index of Private Housing Rental Prices, UK: October 2025",
    released: "19 November 2025",
    covers: "Average private rents, UK",
  },
};

// The fourteen headline indicators. `series.points` are [label, value] pairs
// in the order they are drawn; `series.note` says what the points are.
export const INDICATORS = [
  {
    id: "cpi",
    label: "Consumer prices",
    short: "Inflation",
    value: "3.6%",
    change: "Down from 3.8% in September 2025",
    direction: "down",
    period: "12 months to October 2025",
    source: "ons_cpi",
    headline:
      "Prices rose 3.6% in the year to October 2025, down from 3.8% in September.",
    series: {
      title: "Inflation is back near its 2021 level after the 2022 peak",
      yUnit: "%",
      note: "CPI annual average, 2020 to 2024; 2025 is the 12 months to October.",
      points: [
        ["2020", 0.9],
        ["2021", 2.6],
        ["2022", 9.1],
        ["2023", 7.3],
        ["2024", 2.5],
        ["2025", 3.6],
      ],
    },
    detail: [
      "Consumer prices rose 3.6% in the 12 months to October 2025, down from 3.8% in September. The CPIH measure, which includes owner occupiers’ housing costs, rose 3.8%.",
      "Inflation peaked at 9.1% on the annual average in 2022 and has fallen in each year since, but it is still above the Bank of England’s 2% target.",
    ],
    method:
      "CPI measures the change in the price of a fixed basket of goods and services bought by households. The annual rate compares prices with the same month a year earlier.",
  },
  {
    id: "unemployment",
    label: "Unemployment rate",
    short: "Unemployment",
    value: "5.0%",
    change: "Up from a 4.3% annual average in 2024",
    direction: "up",
    period: "July to September 2025",
    source: "ons_labour",
    headline:
      "One in twenty people in the labour force was out of work and looking for a job.",
    series: {
      title: "Unemployment is climbing back after the 2022 low",
      yUnit: "%",
      note: "Annual average unemployment rate, aged 16 and over, seasonally adjusted.",
      points: [
        ["2020", 4.6],
        ["2021", 4.6],
        ["2022", 3.8],
        ["2023", 4.1],
        ["2024", 4.3],
      ],
    },
    detail: [
      "The unemployment rate was 5.0% in July to September 2025, with 1,787,000 people unemployed. The employment rate was 75.1% and economic inactivity was 20.9%.",
      "The annual average fell to 3.8% in 2022, the lowest in the series shown here, and has risen in each year since.",
    ],
    method:
      "The rate is the share of the labour force aged 16 and over that is out of work, available to start work and actively seeking it, from the Labour Force Survey.",
  },
  {
    id: "gdp",
    label: "Economic growth",
    short: "GDP growth",
    value: "+0.1%",
    change: "After +0.2% in Quarter 2 2025; +1.3% on a year earlier",
    direction: "up",
    period: "Quarter 3 2025 (July to September)",
    source: "ons_gdp",
    headline:
      "The economy grew 0.1% in the third quarter of 2025 — its slowest quarter of the year so far.",
    series: {
      title: "Growth has slowed to a near-standstill in 2025",
      yUnit: "%",
      note: "Quarterly GDP growth, Quarter 1 2024 to Quarter 3 2025.",
      points: [
        ["Q1 2024", 0.8],
        ["Q2 2024", 0.6],
        ["Q3 2024", 0.2],
        ["Q4 2024", 0.2],
        ["Q1 2025", 0.7],
        ["Q2 2025", 0.2],
        ["Q3 2025", 0.1],
      ],
    },
    detail: [
      "Real GDP grew 0.1% in Quarter 3 2025, after 0.2% in Quarter 2 and 0.7% in Quarter 1. Compared with a year earlier, the economy was 1.3% larger.",
      "Annual growth was 1.1% in 2024, after 0.4% in 2023 and 4.8% in 2022. The 2020 fall of 10.3% was the largest annual drop on record.",
    ],
    method:
      "GDP is the value of all goods and services produced in the UK, adjusted for inflation. Quarterly growth compares one quarter with the one before it.",
  },
  {
    id: "bank-rate",
    label: "Bank Rate",
    short: "Bank Rate",
    value: "4.00%",
    change: "Held on 6 November 2025, by a 5–4 vote",
    direction: "flat",
    period: "Set 6 November 2025; next decision 18 December 2025",
    source: "bank_rate",
    headline:
      "The Bank of England held its main interest rate at 4.00% — four of the nine members wanted a cut.",
    series: {
      title: "Rates rose fast in 2022 and 2023, then started to come down",
      yUnit: "%",
      note: "Bank Rate at the end of each year.",
      points: [
        ["2020", 0.1],
        ["2021", 0.25],
        ["2022", 3.5],
        ["2023", 5.25],
        ["2024", 4.75],
        ["2025", 4.0],
      ],
    },
    detail: [
      "Bank Rate was held at 4.00% on 6 November 2025, with five members voting to hold and four preferring a cut to 3.75%. It has been at 4.00% since August 2025.",
      "The rate stood at 0.10% at the end of 2020, rose to 5.25% by the end of 2023, and has been cut in steps since August 2024.",
    ],
    method:
      "Bank Rate is the interest rate the Bank of England pays on reserves held by commercial banks. It is the main lever of UK monetary policy and feeds into mortgage and savings rates.",
  },
  {
    id: "population",
    label: "Population",
    short: "Population",
    value: "69.3m",
    change: "Up from 67.0 million at the 2021 census",
    direction: "up",
    period: "Mid-2024 estimate",
    source: "ons_population",
    headline:
      "The UK population reached 69.3 million in mid-2024 — 2.3 million more than at the 2021 census.",
    series: {
      title: "The population passed 69 million in 2024",
      yUnit: "m",
      note: "UK population at each census and the mid-2024 estimate, millions.",
      points: [
        ["2011", 63.2],
        ["2021", 67.0],
        ["2024", 69.3],
      ],
    },
    detail: [
      "The population was estimated at 69,281,400 in mid-2024. England held 58,620,000 people, Scotland 5,547,000, Wales 3,187,000 and Northern Ireland 1,928,000.",
      "Growth since the 2021 census has been driven mainly by international migration, with more people arriving than leaving.",
    ],
    method:
      "Mid-year estimates count the usually resident population on 30 June, built from the census, births, deaths and migration data.",
  },
  {
    id: "life-expectancy",
    label: "Life expectancy",
    short: "Life expectancy",
    value: "82.8 / 78.8 yrs",
    change: "Women 82.8 years, men 78.8 years at birth",
    direction: "up",
    period: "2021 to 2023",
    source: "ons_life_tables",
    headline:
      "A baby girl born in 2021–23 could expect to live 82.8 years, a baby boy 78.8 years.",
    series: {
      title: "Male life expectancy is still below its 2018–20 level",
      yUnit: "yrs",
      note: "Period life expectancy at birth, males, three-year periods.",
      points: [
        ["2018–20", 79.0],
        ["2019–21", 78.7],
        ["2020–22", 78.6],
        ["2021–23", 78.8],
      ],
    },
    detail: [
      "Life expectancy at birth in 2021 to 2023 was 82.8 years for females and 78.8 years for males. At age 65, a further 21.0 years was expected for women and 18.5 for men.",
      "Both figures are still below the pre-pandemic peak of 2017–19 (83.0 years for women, 79.3 for men). England is highest among the nations; Scotland is lowest.",
    ],
    method:
      "Period life expectancy asks how long a baby would live if the death rates of these three years applied throughout its life. It is not a forecast of any real person’s lifespan.",
  },
  {
    id: "nhs-waiting-list",
    label: "NHS waiting list",
    short: "NHS waiting list",
    value: "7.4m",
    change: "Down from the 7.77 million peak of September 2023",
    direction: "down",
    period: "End of September 2025, England",
    source: "nhs_rtt",
    headline:
      "7.4 million hospital treatment pathways were waiting at the end of September 2025 — about 6.2 million people.",
    series: {
      title: "The waiting list has fallen for two years from its 2023 peak",
      yUnit: "m",
      note: "Incomplete referral-to-treatment pathways at the end of September, millions, England.",
      points: [
        ["2019", 4.6],
        ["2021", 5.9],
        ["2022", 7.1],
        ["2023", 7.8],
        ["2024", 7.6],
        ["2025", 7.4],
      ],
    },
    detail: [
      "At the end of September 2025, 7.4 million pathways were waiting to start consultant-led treatment in England, covering around 6.2 million people — some people are on more than one pathway.",
      "61.8% had waited up to 18 weeks, against a 92% standard. The median wait was 13.4 weeks, and 180,329 pathways had waited more than a year.",
    ],
    method:
      "Referral-to-treatment (RTT) pathways count each referral for consultant-led elective care. The list is a count of pathways, not people.",
  },
  {
    id: "neet",
    label: "Young people not in work or study",
    short: "NEET rate",
    value: "12.7%",
    change: "946,000 people aged 16 to 24",
    direction: "up",
    period: "July to September 2025",
    source: "ons_neet",
    headline:
      "One in eight young people aged 16 to 24 was not in education, employment or training.",
    series: {
      title: "The number of young people outside work and study is rising again",
      yUnit: "000s",
      note: "Young people aged 16 to 24 not in education, employment or training, thousands.",
      points: [
        ["Jan–Mar 2024", 930],
        ["Jan–Mar 2025", 923],
        ["Jul–Sep 2025", 946],
      ],
    },
    detail: [
      "An estimated 12.7% of people aged 16 to 24 — 946,000 — were not in education, employment or training in July to September 2025. The rate was 13.4% for young men and 11.9% for young women.",
      "Among 18- to 24-year-olds the rate was 15.1%, or 880,000 people. The ONS warns these estimates are volatile because the group is small.",
    ],
    method:
      "NEET counts young people who are not in education, employment or training, from the Labour Force Survey. The ONS badges these as official statistics in development.",
  },
  {
    id: "pay-growth",
    label: "Pay growth",
    short: "Pay growth",
    value: "4.7%",
    change: "Regular pay, on a year earlier; total pay grew 4.9%",
    direction: "down",
    period: "July to September 2025",
    source: "ons_awe",
    headline:
      "Regular pay grew 4.7% on a year earlier — the slowest pace since the 2023 peak above 7%.",
    series: {
      title: "Pay growth has cooled from above 6% to below 5%",
      yUnit: "%",
      note: "Annual growth in average regular weekly earnings, three-month periods.",
      points: [
        ["Nov 23–Jan 24", 6.1],
        ["Jan–Mar 2024", 6.0],
        ["Jun–Aug 2024", 4.9],
        ["Jul–Sep 2025", 4.7],
      ],
    },
    detail: [
      "Average regular pay (excluding bonuses) grew 4.7% in July to September 2025 compared with a year earlier. Total pay including bonuses grew 4.9%.",
      "Growth was above 6% through early 2024 and above 7% in late 2023. In June to August 2024, regular pay grew 1.9% after inflation.",
    ],
    method:
      "Average weekly earnings covers employees in Great Britain, before tax. The headline rate compares the latest three months with the same three months a year earlier.",
  },
  {
    id: "vacancies",
    label: "Job vacancies",
    short: "Vacancies",
    value: "728,000",
    change: "Down 571,000 from the March–May 2022 peak",
    direction: "down",
    period: "July to September 2025",
    source: "ons_vacancies",
    headline:
      "Employers were advertising 728,000 jobs — the 39th straight quarterly fall from the 2022 peak.",
    series: {
      title: "Vacancies have fallen by more than 40% from their peak",
      yUnit: "000s",
      note: "Total vacancies, thousands, seasonally adjusted, three-month periods.",
      points: [
        ["Mar–May 2022", 1299],
        ["Jul–Sep 2023", 984],
        ["Jul–Sep 2025", 728],
      ],
    },
    detail: [
      "There were 728,000 vacancies in July to September 2025, down from a peak of about 1,299,000 in March to May 2022. Vacancies have now fallen on the quarter for more than three years.",
      "There were 2.3 unemployed people per vacancy in May to July 2025, up from 2.2 the quarter before. Workforce jobs stood at 36.8 million in June 2025.",
    ],
    method:
      "Vacancies are unfilled jobs employers are actively trying to recruit for, from the ONS Vacancy Survey, as three-month averages.",
  },
  {
    id: "trade-deficit",
    label: "Trade deficit",
    short: "Trade deficit",
    value: "£5.6bn",
    change: "Widened from £2.8bn in Quarter 2 2025",
    direction: "up",
    period: "Quarter 3 2025 (July to September)",
    source: "ons_trade",
    headline:
      "The UK bought £5.6 billion more in goods and services than it sold in the third quarter of 2025.",
    series: {
      title: "The trade gap nearly doubled in one quarter",
      yUnit: "£bn",
      note: "Total trade in goods and services balance, £ billion, excluding precious metals.",
      points: [
        ["Q2 2025", -2.8],
        ["Q3 2025", -5.6],
      ],
    },
    detail: [
      "The total trade deficit widened to £5.6 billion in Quarter 3 2025. The goods deficit widened to £59.6 billion, while the services surplus grew to £54.0 billion.",
      "Services — finance, professional services, travel and the like — offset most of the goods gap, as they have for years.",
    ],
    method:
      "Trade figures exclude non-monetary gold and other precious metals. A deficit means imports exceeded exports in the quarter.",
  },
  {
    id: "net-debt",
    label: "Public sector net debt",
    short: "Net debt",
    value: "94.5%",
    change: "Of GDP; 0.2 points lower than a year earlier",
    direction: "down",
    period: "End of October 2025",
    source: "ons_public_finances",
    headline:
      "Public sector net debt stood at 94.5% of GDP — a level last seen in the early 1960s.",
    series: {
      title: "Debt is steady at about 95% of GDP",
      yUnit: "%",
      note: "Public sector net debt excluding public sector banks, % of GDP, end of October.",
      points: [
        ["Oct 2024", 94.7],
        ["Oct 2025", 94.5],
      ],
    },
    detail: [
      "Public sector net debt excluding public sector banks was £2,904.9 billion at the end of October 2025, or 94.5% of GDP — 0.2 percentage points less than a year earlier.",
      "The public sector borrowed £17.4 billion in October 2025 alone. Net financial liabilities, a narrower measure, were 84.0% of GDP.",
    ],
    method:
      "Net debt is what the public sector owes minus its liquid assets, excluding public sector banks. Expressing it as a share of GDP shows how big it is next to the whole economy.",
  },
  {
    id: "weekly-pay",
    label: "Average weekly pay",
    short: "Weekly pay",
    value: "£680",
    change: "Regular pay per week, before tax",
    direction: "up",
    period: "July 2025",
    source: "ons_awe",
    headline:
      "The average employee in Great Britain earned £680 a week in regular pay in July 2025.",
    series: {
      title: "Average weekly pay has risen by £67 in two years",
      yUnit: "£",
      note: "Average regular weekly earnings, Great Britain, £ per week. Annual averages for 2023 and 2024; July 2025 is the latest month published.",
      points: [
        ["2023", 613],
        ["2024", 648],
        ["Jul 2025", 680],
      ],
    },
    detail: [
      "Average regular pay was £680 a week in July 2025. The annual average was £648 in 2024 and £613 in 2023, in cash terms before tax and National Insurance.",
      "Pay has risen in cash terms every year of the series, but after inflation the gains are small: in June to August 2024, regular pay grew 1.9% in real terms on the year.",
    ],
    method:
      "Average weekly earnings divides the total pay bill by the number of employees. It covers employees in Great Britain; the self-employed and Northern Ireland are not counted.",
  },
  {
    id: "house-prices",
    label: "Average house price",
    short: "House prices",
    value: "£272,000",
    change: "Up 2.6% on a year earlier",
    direction: "up",
    period: "September 2025",
    source: "ons_house_prices",
    headline:
      "The average UK home cost £272,000 in September 2025 — £556,000 in London, £193,000 in Northern Ireland.",
    series: {
      title: "House prices by nation, September 2025",
      yUnit: "£",
      kind: "bars",
      note: "Average house price, £. Northern Ireland is Quarter 3 2025.",
      points: [
        ["London", 556000],
        ["England", 293000],
        ["UK", 272000],
        ["Wales", 209000],
        ["Scotland", 194000],
        ["N. Ireland", 193000],
      ],
    },
    detail: [
      "The average UK house price was £272,000 in September 2025, up 2.6% on a year earlier. England averaged £293,000, Wales £209,000, Scotland £194,000 and Northern Ireland £193,000.",
      "London was the only region where prices fell, down 1.8% on the year to £556,000. Average private rent across the UK was £1,360 a month, up 5.0% in the year to October 2025.",
    ],
    method:
      "The UK House Price Index is based on completed house sales. The Northern Ireland figure is for the third quarter of 2025.",
  },
];

// The eight subject pages: the question a visitor asks, the indicators that
// answer it, and the extra figures that belong only on that page.
export const SUBJECTS = [
  {
    id: "prices",
    title: "Prices",
    question: "How fast are prices rising, and what does a home cost?",
    intro:
      "Inflation is the number most people check first. This page puts it next to the cost of a home and the cost of renting one.",
    indicators: ["cpi", "house-prices"],
    extra: [
      { label: "CPIH inflation", value: "3.8%", note: "12 months to October 2025, ONS" },
      { label: "Average private rent", value: "£1,360 a month", note: "Up 5.0% in the year to October 2025, ONS" },
      { label: "London house price", value: "£556,000", note: "Down 1.8% on the year, September 2025, ONS" },
      { label: "Bank of England target", value: "2%", note: "CPI inflation target" },
    ],
  },
  {
    id: "jobs",
    title: "Jobs",
    question: "Can people find work, and is pay keeping up?",
    intro:
      "Who has a job, who is looking for one, how many jobs are open, and what they pay — the labour market in four numbers.",
    indicators: ["unemployment", "vacancies", "pay-growth", "weekly-pay"],
    extra: [
      { label: "Employment rate", value: "75.1%", note: "July to September 2025, ONS" },
      { label: "Economic inactivity", value: "20.9%", note: "July to September 2025, ONS" },
      { label: "People unemployed", value: "1,787,000", note: "July to September 2025, ONS" },
      { label: "Unemployed per vacancy", value: "2.3", note: "May to July 2025, ONS" },
    ],
  },
  {
    id: "population",
    title: "Population",
    question: "How many people live here, and where?",
    intro:
      "The size of the population, how it is spread across the four nations, and how long people live.",
    indicators: ["population", "life-expectancy"],
    extra: [
      { label: "England", value: "58,620,000", note: "Mid-2024, ONS" },
      { label: "Scotland", value: "5,547,000", note: "Mid-2024, ONS" },
      { label: "Wales", value: "3,187,000", note: "Mid-2024, ONS" },
      { label: "Northern Ireland", value: "1,928,000", note: "Mid-2024, ONS" },
    ],
  },
  {
    id: "economy",
    title: "Economy",
    question: "Is the economy growing, and what does the state owe?",
    intro:
      "Growth, interest rates and the public finances — the three numbers that decide what the economy can afford.",
    indicators: ["gdp", "bank-rate", "net-debt"],
    extra: [
      { label: "GDP, annual growth 2024", value: "+1.1%", note: "ONS" },
      { label: "GDP vs a year earlier", value: "+1.3%", note: "Quarter 3 2025, ONS" },
      { label: "Public borrowing, October 2025", value: "£17.4bn", note: "ONS" },
      { label: "Net debt, £ billion", value: "£2,904.9bn", note: "End of October 2025, ONS" },
    ],
  },
  {
    id: "health",
    title: "Health",
    question: "How long do we live, and how long do we wait for care?",
    intro:
      "Life expectancy and the hospital waiting list — the two headline numbers for the nation’s health.",
    indicators: ["life-expectancy", "nhs-waiting-list"],
    extra: [
      { label: "Life expectancy at 65", value: "18.5 / 21.0 yrs", note: "Men / women, 2021–23, ONS" },
      { label: "Waiting within 18 weeks", value: "61.8%", note: "September 2025, NHS England" },
      { label: "Median wait", value: "13.4 weeks", note: "September 2025, NHS England" },
      { label: "Waiting over a year", value: "180,329", note: "Pathways, September 2025, NHS England" },
    ],
  },
  {
    id: "education",
    title: "Education",
    question: "Are young people in work, training or study?",
    intro:
      "The headline measure for young people’s prospects is the share neither working nor learning — and it is rising.",
    indicators: ["neet"],
    extra: [
      { label: "NEET, ages 18 to 24", value: "15.1%", note: "880,000 people, July to September 2025, ONS" },
      { label: "NEET, young men", value: "13.4%", note: "July to September 2025, ONS" },
      { label: "NEET, young women", value: "11.9%", note: "July to September 2025, ONS" },
      { label: "NEET, January to March 2025", value: "12.5%", note: "923,000 people, ONS" },
    ],
  },
  {
    id: "trade",
    title: "Trade",
    question: "What does the UK sell to the world, and what does it buy?",
    intro:
      "The UK runs a large deficit in goods and a large surplus in services. The two nearly cancel — but not quite.",
    indicators: ["trade-deficit"],
    extra: [
      { label: "Goods deficit", value: "−£59.6bn", note: "Quarter 3 2025, ONS" },
      { label: "Services surplus", value: "+£54.0bn", note: "Quarter 3 2025, ONS" },
      { label: "Total deficit, Quarter 2", value: "−£2.8bn", note: "ONS" },
      { label: "Services surplus, change", value: "+£0.2bn", note: "On the quarter, Quarter 3 2025, ONS" },
    ],
  },
  {
    id: "regions",
    title: "Regions",
    question: "How do the four nations compare?",
    intro:
      "The same figures, cut by nation: people, house prices and how long people live.",
    indicators: ["house-prices", "population"],
    extra: [
      { label: "Life expectancy, England", value: "79.1 / 83.0 yrs", note: "Men / women, 2021–23, ONS" },
      { label: "Life expectancy, Scotland", value: "76.8 / 80.8 yrs", note: "Men / women, 2021–23, ONS" },
      { label: "Life expectancy, Wales", value: "78.1 / 82.0 yrs", note: "Men / women, 2021–23, ONS" },
      { label: "Life expectancy, N. Ireland", value: "78.8 / 82.5 yrs", note: "Men / women, 2021–23, ONS" },
    ],
  },
];

// The latest releases, newest first — the dates are the publication dates.
export const RELEASES = [
  { date: "21 November 2025", text: "Public sector finances: net debt 94.5% of GDP at the end of October", source: "ons_public_finances" },
  { date: "20 November 2025", text: "Young people not in education, employment or training: 12.7% in July to September", source: "ons_neet" },
  { date: "19 November 2025", text: "Consumer prices up 3.6% in the year to October; house prices up 2.6% in September", source: "ons_cpi" },
  { date: "14 November 2025", text: "UK trade: deficit of £5.6 billion in the third quarter", source: "ons_trade" },
  { date: "13 November 2025", text: "Economy grew 0.1% in the third quarter; NHS waiting list 7.4 million at the end of September", source: "ons_gdp" },
  { date: "11 November 2025", text: "Unemployment 5.0% and regular pay growth 4.7% in July to September", source: "ons_labour" },
  { date: "14 October 2025", text: "Vacancies down to 728,000 in July to September", source: "ons_vacancies" },
];

export function indicatorById(id) {
  return INDICATORS.find((entry) => entry.id === id) || null;
}

export function subjectById(id) {
  return SUBJECTS.find((entry) => entry.id === id) || null;
}

export function sourceByKey(key) {
  return SOURCES[key] || null;
}

export function sourceLine(key) {
  const source = sourceByKey(key);
  if (!source) return "";
  return source.publisher + " — " + source.title + " (" + source.released + ")";
}
