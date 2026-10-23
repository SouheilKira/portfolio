/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "SouheilKira",

  // Where the contact form delivers (via formsubmit.co relay)
  // TODO: put YOUR email here, or messages will not reach you
  contactEmail: "souheilbentelidjan2004@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  // TODO: replace each url with the exact link of that project's repo or live site.
  featured: [
    {
      title: "Satellite Crop Classification",
      tag: "Computer Vision", color: "#3dff6e",
      url: "https://github.com/SouheilKira/MCTNet-satellite-crop-classification", cta: "View on GitHub →",
      img: "assets/projects/crops.png",
      desc: "A machine-learning project that classifies crops from satellite imagery, combining computer vision with real-world remote-sensing data.",
    },
    {
      title: "Algeria Tourism Website",
      tag: "Web Development", color: "#e60012",
      url: "https://github.com/SouheilKira/PFE-algeria-tourism-website", cta: "View on GitHub →",
      img: "assets/projects/tourism.png",
      desc: "A website that presents tourism in Algeria, built to practise turning an idea into a complete, practical web project.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed.
  // Add the exact repo names of your featured projects here once you know them.
  featuredRepoNames: [
    // "your-crop-classification-repo",
    // "your-tourism-website-repo",
  ],

  // Shown if the GitHub API can't be reached (empty = nothing extra is shown)
  fallbackRepos: [],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "RepoName": "assets/projects/your-image.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  // The numbers are bar lengths out of 100. Set them honestly to match your own level.
  skills: [
    { group: "AI · ML · Data Science", items: [
      ["Python", 75], ["Machine Learning", 70],
      ["Deep Learning", 65], ["Computer Vision", 65],
      ["Satellite Image Analysis", 60],
    ]},
    { group: "Currently Exploring", items: [
      ["Autonomous AI Agents", 50], ["Multi-Agent Systems", 45],
    ]},
    { group: "Web & Tools", items: [
      ["Web Development", 65], ["Git & GitHub", 70],
    ]},
    { group: "Learning & Certificates", items: [
      ["IBM AI Course (completed)", 100],
      ["MSc Artificial Intelligence (year 2)", 60],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
