export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Category = 'Behavioral' | 'Technical' | 'System Design' | 'Problem Solving' | 'Leadership' | 'Situational' | 'Coding' | 'SQL' | 'Analytics';

export interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export interface Question {
  id: number;
  question: string;
  category: Category;
  difficulty: Difficulty;
  company: string;
  tips: string[];
  sampleAnswer: string;
  followUp: string;
  timeLimit: number; // in seconds
  // Coding question specific fields
  isCoding?: boolean;
  starterCode?: string;
  testCases?: TestCase[];
  solutionCode?: string;
  language?: string;
  explanation?: string;
}

export const companies = [
  'Google', 'Amazon', 'Meta', 'Apple', 'Microsoft',
  'Netflix', 'Uber', 'Airbnb', 'Stripe', 'Spotify', 'Healthcare Company'
] as const;

export const categories: Category[] = [
  'Behavioral', 'Technical', 'System Design', 'Problem Solving', 'Leadership', 'Situational', 'Coding', 'SQL', 'Analytics'
];

export const questions: Question[] = [
  // GOOGLE
  {
    id: 1,
    question: "Tell me about a time you had to deal with ambiguity in a project. How did you handle it?",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Google",
    tips: [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Focus on how you sought clarity and made decisions",
      "Highlight your communication with stakeholders"
    ],
    sampleAnswer: "In my previous role, I was assigned to lead a new feature with vague requirements. I proactively scheduled meetings with stakeholders to clarify objectives, created a decision matrix for uncertain areas, broke the project into phases with clear milestones, and delivered the MVP 2 weeks early. The feature increased user engagement by 25%.",
    followUp: "What would you do differently if you faced a similar situation again?",
    timeLimit: 180
  },
  {
    id: 2,
    question: "Design a URL shortener service like bit.ly. Walk me through your approach.",
    category: "System Design",
    difficulty: "Hard",
    company: "Google",
    tips: [
      "Start with requirements and constraints",
      "Discuss the hashing/encoding strategy",
      "Address scalability, caching, and analytics",
      "Consider database choices and partitioning"
    ],
    sampleAnswer: "I'd design the system with: 1) A Base62 encoding service to convert IDs to short URLs, 2) A distributed key-value store (like DynamoDB) for fast lookups, 3) A caching layer (Redis) for popular URLs, 4) A load balancer for horizontal scaling, 5) Analytics pipeline using event streaming. The system should handle 100M+ URLs with sub-10ms redirect latency.",
    followUp: "How would you handle URL expiration and custom short URLs?",
    timeLimit: 300
  },
  {
    id: 3,
    question: "What's the difference between TCP and UDP? When would you use each?",
    category: "Technical",
    difficulty: "Easy",
    company: "Google",
    tips: [
      "Explain the fundamental differences clearly",
      "Give real-world use cases for each",
      "Mention reliability vs speed tradeoffs"
    ],
    sampleAnswer: "TCP is connection-oriented, provides guaranteed delivery with ordering and error checking. UDP is connectionless, faster but unreliable. Use TCP for web browsing, email, file transfers where data integrity matters. Use UDP for video streaming, gaming, DNS lookups where speed is prioritized over perfect delivery.",
    followUp: "How does TCP handle congestion control?",
    timeLimit: 120
  },
  // AMAZON
  {
    id: 4,
    question: "Tell me about a time when you disagreed with your manager. How did you handle it?",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Amazon",
    tips: [
      "Amazon values 'Have Backbone; Disagree and Commit'",
      "Show you can respectfully challenge while being data-driven",
      "Demonstrate that you committed once a decision was made"
    ],
    sampleAnswer: "My manager wanted to delay a critical security patch for a feature release. I presented data showing the vulnerability risk, proposed a parallel approach to ship both, and when the team decided to prioritize the feature with a 1-week patch deadline, I committed fully and delivered both on time.",
    followUp: "What if your manager had still disagreed after seeing the data?",
    timeLimit: 180
  },
  {
    id: 5,
    question: "Design an e-commerce recommendation system. How would you approach this?",
    category: "System Design",
    difficulty: "Hard",
    company: "Amazon",
    tips: [
      "Discuss collaborative filtering and content-based approaches",
      "Address cold start problem",
      "Consider real-time vs batch processing",
      "Think about A/B testing the recommendations"
    ],
    sampleAnswer: "I'd use a hybrid approach: 1) Collaborative filtering for users with history, 2) Content-based filtering for new users (cold start), 3) Real-time event processing with Kafka for session-based recommendations, 4) ML model (neural collaborative filtering) trained on purchase/click data, 5) A/B testing framework to measure recommendation quality.",
    followUp: "How would you measure the success of the recommendation system?",
    timeLimit: 300
  },
  {
    id: 6,
    question: "Describe a situation where you had to deliver results under a tight deadline. What was your approach?",
    category: "Behavioral",
    difficulty: "Easy",
    company: "Amazon",
    tips: [
      "Amazon values 'Deliver Results' and 'Bias for Action'",
      "Show how you prioritized and made tradeoffs",
      "Quantify the impact of your delivery"
    ],
    sampleAnswer: "During a critical product launch, we discovered a major integration bug 3 days before release. I triaged the issue, identified the root cause in 2 hours, coordinated with 3 teams for a fix, implemented automated tests to prevent regression, and we launched on time. The launch generated $2M in first-week revenue.",
    followUp: "How do you decide when to cut scope vs extend a deadline?",
    timeLimit: 150
  },
  // META
  {
    id: 7,
    question: "How would you design the Facebook News Feed? Consider both the backend and ranking algorithm.",
    category: "System Design",
    difficulty: "Hard",
    company: "Meta",
    tips: [
      "Discuss fan-out on write vs fan-out on read",
      "Address ranking signals and ML models",
      "Consider content moderation and diversity",
      "Think about real-time updates and caching"
    ],
    sampleAnswer: "I'd design it with: 1) Fan-out on write for users with few friends, fan-out on read for celebrities, 2) A ranking service using features like engagement probability, recency, relationship strength, 3) Content diversity rules to prevent filter bubbles, 4) Redis caching for hot feeds, 5) Real-time push for new high-priority content.",
    followUp: "How would you handle content that goes viral?",
    timeLimit: 300
  },
  {
    id: 8,
    question: "Given an array of integers, find two numbers that add up to a target sum. Optimize for time complexity.",
    category: "Problem Solving",
    difficulty: "Easy",
    company: "Meta",
    tips: [
      "Start with the brute force approach, then optimize",
      "Consider using a hash map for O(n) solution",
      "Discuss edge cases: duplicates, negative numbers, no solution"
    ],
    sampleAnswer: "Use a hash map approach: iterate through the array, for each number check if (target - current) exists in the map. If yes, return the pair. If no, add current number to the map. Time: O(n), Space: O(n). Handle edge cases: empty array, single element, no valid pair.",
    followUp: "What if the array is sorted? Can you solve it with O(1) space?",
    timeLimit: 180
  },
  {
    id: 9,
    question: "Tell me about a time you received critical feedback. How did you respond?",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Meta",
    tips: [
      "Show growth mindset and self-awareness",
      "Describe specific actions you took to improve",
      "Demonstrate the positive outcome"
    ],
    sampleAnswer: "During a code review, a senior engineer pointed out that my code lacked proper error handling and tests. Instead of being defensive, I thanked them, spent a weekend studying testing best practices, refactored my code with comprehensive tests, and started a weekly testing workshop. My code quality scores improved by 40%.",
    followUp: "How do you give constructive feedback to peers?",
    timeLimit: 150
  },
  // APPLE
  {
    id: 10,
    question: "How do you approach building products that balance user privacy with functionality?",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Apple",
    tips: [
      "Apple deeply values user privacy",
      "Discuss privacy-by-design principles",
      "Give examples of privacy-preserving techniques"
    ],
    sampleAnswer: "I believe in privacy-by-design. In my previous role, I implemented on-device ML processing for personalization instead of server-side, used differential privacy for analytics, minimized data collection to essential fields only, and gave users granular privacy controls. This maintained feature quality while reducing data liability by 60%.",
    followUp: "How would you handle a feature request that requires collecting sensitive user data?",
    timeLimit: 180
  },
  {
    id: 11,
    question: "Explain the concept of memory management in iOS. What are retain cycles and how do you prevent them?",
    category: "Technical",
    difficulty: "Medium",
    company: "Apple",
    tips: [
      "Explain ARC (Automatic Reference Counting)",
      "Describe strong vs weak vs unowned references",
      "Give practical examples of retain cycles"
    ],
    sampleAnswer: "iOS uses ARC for memory management. Retain cycles occur when two objects strongly reference each other, preventing deallocation. Common in closures and delegate patterns. Prevention: use weak references for delegates, capture lists with [weak self] in closures, and unowned when the referenced object always outlives the reference.",
    followUp: "What tools would you use to detect memory leaks in an iOS app?",
    timeLimit: 180
  },
  // MICROSOFT
  {
    id: 12,
    question: "Describe a time when you had to influence a team without formal authority. What strategies did you use?",
    category: "Leadership",
    difficulty: "Medium",
    company: "Microsoft",
    tips: [
      "Show your ability to build consensus",
      "Demonstrate empathy and active listening",
      "Highlight data-driven persuasion"
    ],
    sampleAnswer: "I noticed our deployment process was causing frequent incidents. Without being in a management role, I gathered data on deployment failures, created a presentation showing the impact, organized a cross-team workshop, and proposed a CI/CD improvement plan. I got buy-in from 4 teams and reduced deployment failures by 70%.",
    followUp: "What do you do when you can't get buy-in from all stakeholders?",
    timeLimit: 180
  },
  {
    id: 13,
    question: "Design a real-time collaborative document editing system like Google Docs.",
    category: "System Design",
    difficulty: "Hard",
    company: "Microsoft",
    tips: [
      "Discuss conflict resolution strategies (OT vs CRDT)",
      "Address real-time sync via WebSockets",
      "Consider offline support and version history",
      "Think about permission management"
    ],
    sampleAnswer: "I'd use CRDTs (Conflict-free Replicated Data Types) for conflict resolution, WebSocket connections for real-time sync, a document server that manages sessions and cursors, persistent storage with version history (event sourcing), and an operational log for undo/redo. Include presence indicators and commenting system.",
    followUp: "How would you handle users on slow or intermittent connections?",
    timeLimit: 300
  },
  // NETFLIX
  {
    id: 14,
    question: "How would you design a video streaming service that handles millions of concurrent viewers?",
    category: "System Design",
    difficulty: "Hard",
    company: "Netflix",
    tips: [
      "Discuss CDN architecture and edge caching",
      "Address adaptive bitrate streaming",
      "Consider content encoding and storage",
      "Think about fault tolerance"
    ],
    sampleAnswer: "Key components: 1) Multi-CDN strategy with edge servers worldwide, 2) Adaptive bitrate streaming (ABR) that adjusts quality based on bandwidth, 3) Content pre-positioned at edge locations based on predictive models, 4) Microservices architecture for fault isolation, 5) Chaos engineering for resilience testing.",
    followUp: "How would you optimize for reducing buffering events?",
    timeLimit: 300
  },
  {
    id: 15,
    question: "Netflix values 'Freedom and Responsibility'. Tell me about a time you took ownership of something beyond your job description.",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Netflix",
    tips: [
      "Show initiative and ownership mentality",
      "Demonstrate impact beyond your immediate role",
      "Highlight how you balanced this with your core responsibilities"
    ],
    sampleAnswer: "I noticed our on-call rotation was causing burnout. Though not in my scope, I analyzed incident patterns, built an automated runbook system, created a mentorship program for on-call engineers, and proposed a rotation restructuring. On-call incidents requiring human intervention dropped by 50%, and team satisfaction improved significantly.",
    followUp: "How do you prioritize when you take on responsibilities beyond your role?",
    timeLimit: 180
  },
  // UBER
  {
    id: 16,
    question: "Design a ride-matching system that efficiently pairs riders with nearby drivers.",
    category: "System Design",
    difficulty: "Hard",
    company: "Uber",
    tips: [
      "Discuss geospatial indexing (geohash, quadtree)",
      "Address real-time location tracking",
      "Consider surge pricing and ETA calculation",
      "Think about matching algorithm optimization"
    ],
    sampleAnswer: "I'd use: 1) Geohash-based spatial indexing for fast nearby driver lookups, 2) Real-time location updates via WebSocket, 3) A matching algorithm considering distance, driver rating, estimated pickup time, and demand, 4) A supply-demand pricing model, 5) Route optimization using graph algorithms for ETA.",
    followUp: "How would you handle peak demand scenarios?",
    timeLimit: 300
  },
  {
    id: 17,
    question: "You discover a bug in production that affects 5% of users but fixing it requires a risky deployment. What do you do?",
    category: "Situational",
    difficulty: "Medium",
    company: "Uber",
    tips: [
      "Show structured decision-making",
      "Consider impact assessment and risk mitigation",
      "Discuss communication with stakeholders"
    ],
    sampleAnswer: "First, I'd assess the severity: data loss, financial impact, or UX issue. Then: 1) Implement a quick mitigation (feature flag, workaround), 2) Prepare the fix with comprehensive testing, 3) Plan a staged rollout (canary deployment), 4) Set up monitoring dashboards, 5) Have a rollback plan ready. Communicate timeline and impact to stakeholders.",
    followUp: "What if the bug is causing data corruption for those 5% of users?",
    timeLimit: 180
  },
  // AIRBNB
  {
    id: 18,
    question: "How would you design a search and booking system for a platform like Airbnb?",
    category: "System Design",
    difficulty: "Hard",
    company: "Airbnb",
    tips: [
      "Discuss search indexing (Elasticsearch)",
      "Address booking conflicts and double-booking prevention",
      "Consider pricing algorithms and availability calendars",
      "Think about trust and safety features"
    ],
    sampleAnswer: "Key components: 1) Elasticsearch for full-text and geo-spatial search with filters, 2) Availability service with calendar management, 3) Distributed locking for booking to prevent double-booking, 4) Dynamic pricing engine based on demand, seasonality, and local events, 5) Review and trust scoring system.",
    followUp: "How would you handle search ranking to balance host satisfaction and guest experience?",
    timeLimit: 300
  },
  {
    id: 19,
    question: "Tell me about a time you had to make a decision with incomplete information.",
    category: "Behavioral",
    difficulty: "Easy",
    company: "Airbnb",
    tips: [
      "Show comfort with uncertainty",
      "Demonstrate structured thinking even with limited data",
      "Highlight learning from the outcome"
    ],
    sampleAnswer: "When launching in a new market, we had limited user research data. I created a rapid experimentation framework: launched a minimal version, set up robust analytics, ran weekly user interviews, and iterated based on real data. Within 6 weeks, we had enough insights to make confident product decisions, and the market launch exceeded targets by 30%.",
    followUp: "How do you decide when you have enough information to act?",
    timeLimit: 150
  },
  // STRIPE
  {
    id: 20,
    question: "Explain how you would design a payment processing system that handles high throughput with strong consistency.",
    category: "System Design",
    difficulty: "Hard",
    company: "Stripe",
    tips: [
      "Discuss idempotency for payment operations",
      "Address distributed transactions and eventual consistency",
      "Consider PCI compliance and security",
      "Think about retry mechanisms and failure handling"
    ],
    sampleAnswer: "I'd design with: 1) Idempotency keys to prevent duplicate charges, 2) Two-phase commit for critical payment operations, 3) Event sourcing for complete audit trail, 4) Tokenization for PCI compliance, 5) Circuit breakers for external payment processor calls, 6) Dead letter queues for failed transactions, 7) Reconciliation jobs for consistency verification.",
    followUp: "How would you handle partial failures in a multi-step payment flow?",
    timeLimit: 300
  },
  {
    id: 21,
    question: "Write a function to determine if a given string of parentheses, brackets, and braces is balanced.",
    category: "Problem Solving",
    difficulty: "Easy",
    company: "Stripe",
    tips: [
      "Use a stack data structure",
      "Map closing brackets to their opening counterparts",
      "Consider edge cases: empty string, single bracket, nested brackets"
    ],
    sampleAnswer: "Use a stack: iterate through the string, push opening brackets onto the stack, for closing brackets check if the stack top matches. Return true if the stack is empty at the end. Time: O(n), Space: O(n). Edge cases: empty string (valid), odd length (invalid), mismatched types.",
    followUp: "How would you extend this to handle HTML tags?",
    timeLimit: 150
  },
  // SPOTIFY
  {
    id: 22,
    question: "Design a music recommendation engine that creates personalized playlists.",
    category: "System Design",
    difficulty: "Hard",
    company: "Spotify",
    tips: [
      "Discuss content-based vs collaborative filtering",
      "Address audio feature analysis",
      "Consider exploration vs exploitation tradeoff",
      "Think about real-time feedback loops"
    ],
    sampleAnswer: "I'd combine: 1) Audio feature extraction using deep learning for content similarity, 2) Collaborative filtering based on listening patterns, 3) NLP analysis of playlist names and descriptions, 4) A multi-armed bandit approach for balancing familiar vs new music, 5) Session-based models for mood-aware recommendations, 6) Social graph signals from friend listening.",
    followUp: "How would you handle the cold start problem for new artists?",
    timeLimit: 300
  },
  {
    id: 23,
    question: "You're leading a project and two senior engineers on your team have conflicting technical approaches. How do you resolve this?",
    category: "Leadership",
    difficulty: "Medium",
    company: "Spotify",
    tips: [
      "Show facilitation and decision-making skills",
      "Demonstrate how to evaluate technical tradeoffs objectively",
      "Highlight preserving team relationships"
    ],
    sampleAnswer: "I'd facilitate a structured technical discussion: 1) Have each engineer present their approach with pros/cons, 2) Define evaluation criteria (scalability, maintainability, timeline), 3) Create a decision matrix, 4) If still unclear, propose a time-boxed prototype/spike, 5) Make a clear decision, document the rationale, and ensure both engineers feel heard.",
    followUp: "What if one engineer is still unhappy with the decision?",
    timeLimit: 180
  },
  // Additional varied questions
  {
    id: 24,
    question: "Implement an LRU (Least Recently Used) cache with O(1) get and put operations.",
    category: "Problem Solving",
    difficulty: "Medium",
    company: "Amazon",
    tips: [
      "Use a combination of HashMap and Doubly Linked List",
      "HashMap for O(1) lookups, Linked List for O(1) insertion/deletion",
      "Handle capacity limits and eviction"
    ],
    sampleAnswer: "Use a HashMap<key, ListNode> + Doubly Linked List. Get: look up in map, move node to front of list. Put: if exists, update and move to front; if new and at capacity, remove tail node, add new node to front. Both operations O(1). The list maintains access order, tail = least recently used.",
    followUp: "How would you make this thread-safe?",
    timeLimit: 240
  },
  {
    id: 25,
    question: "How do you handle technical debt in a fast-moving team? Give a specific example.",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Spotify",
    tips: [
      "Show pragmatic approach to tech debt",
      "Demonstrate ability to quantify and prioritize debt",
      "Balance velocity with sustainability"
    ],
    sampleAnswer: "I created a tech debt registry with impact scores (developer time wasted, incident risk, scalability blockers). Allocated 20% of sprint capacity for debt reduction, prioritized by business impact. Example: refactored our authentication module that caused 30% of on-call pages. Reduced incidents by 80% and saved ~15 engineering hours per week.",
    followUp: "How do you convince product managers to invest in tech debt reduction?",
    timeLimit: 180
  },
  {
    id: 26,
    question: "What happens when you type a URL into your browser and press Enter? Walk through the entire process.",
    category: "Technical",
    difficulty: "Medium",
    company: "Google",
    tips: [
      "Cover DNS resolution, TCP connection, TLS handshake",
      "Explain HTTP request/response cycle",
      "Discuss browser rendering pipeline",
      "Mention caching at various levels"
    ],
    sampleAnswer: "1) Browser checks cache, 2) DNS resolution (recursive lookup), 3) TCP 3-way handshake, 4) TLS handshake for HTTPS, 5) HTTP request sent, 6) Server processes and responds, 7) Browser parses HTML, builds DOM, 8) CSS parsed → CSSOM, 9) Render tree constructed, 10) Layout and paint, 11) JavaScript execution, 12) Sub-resource loading.",
    followUp: "How does HTTP/2 change this process?",
    timeLimit: 240
  },
  {
    id: 27,
    question: "Your team's velocity has dropped significantly over the past 3 sprints. How would you diagnose and address this?",
    category: "Leadership",
    difficulty: "Hard",
    company: "Microsoft",
    tips: [
      "Show analytical approach to team dynamics",
      "Consider both technical and human factors",
      "Demonstrate empathy and action-orientation"
    ],
    sampleAnswer: "I'd investigate: 1) Review sprint metrics for patterns, 2) Hold 1:1s to understand individual blockers, 3) Analyze if scope is increasing or estimates are off, 4) Check for context switching or meeting overload, 5) Assess technical blockers (slow CI, flaky tests), 6) Create an action plan addressing top 3 issues with measurable goals and weekly check-ins.",
    followUp: "What if the root cause is burnout across the team?",
    timeLimit: 180
  },
  {
    id: 28,
    question: "A customer reports that your API is returning incorrect data intermittently. How do you investigate and resolve this?",
    category: "Situational",
    difficulty: "Medium",
    company: "Stripe",
    tips: [
      "Show systematic debugging approach",
      "Consider race conditions and caching issues",
      "Discuss monitoring and prevention"
    ],
    sampleAnswer: "1) Reproduce: gather request IDs, timestamps, expected vs actual data, 2) Check logs and traces for those requests, 3) Look for patterns: specific endpoints, user segments, time-based, 4) Investigate likely causes: cache staleness, race conditions, replication lag, 5) Implement fix with comprehensive tests, 6) Add monitoring/alerts to catch similar issues early.",
    followUp: "How would you communicate this issue to affected customers?",
    timeLimit: 180
  },
  {
    id: 29,
    question: "Explain the CAP theorem and how it applies to distributed database design decisions.",
    category: "Technical",
    difficulty: "Hard",
    company: "Netflix",
    tips: [
      "Clearly explain Consistency, Availability, Partition Tolerance",
      "Explain why you can only guarantee 2 of 3",
      "Give real examples of CP vs AP systems"
    ],
    sampleAnswer: "CAP theorem states a distributed system can guarantee only 2 of 3: Consistency (all nodes see same data), Availability (every request gets a response), Partition Tolerance (system works despite network partitions). Since partitions are inevitable, the real choice is CP (e.g., ZooKeeper, HBase) vs AP (e.g., Cassandra, DynamoDB). Modern systems often use tunable consistency.",
    followUp: "How does the PACELC theorem extend CAP?",
    timeLimit: 180
  },
  {
    id: 30,
    question: "Design a notification system that supports push, email, SMS, and in-app notifications at scale.",
    category: "System Design",
    difficulty: "Medium",
    company: "Uber",
    tips: [
      "Discuss event-driven architecture",
      "Address user preferences and rate limiting",
      "Consider delivery guarantees and retry logic",
      "Think about template management"
    ],
    sampleAnswer: "Architecture: 1) Event bus (Kafka) for notification triggers, 2) Notification service that applies user preferences and rate limiting, 3) Channel-specific dispatchers (FCM for push, SendGrid for email, Twilio for SMS), 4) Template engine for consistent messaging, 5) Delivery tracking and analytics, 6) Priority queues for urgent vs batch notifications.",
    followUp: "How would you prevent notification fatigue for users?",
    timeLimit: 240
  },

  // ===== CODING QUESTIONS =====

  // 1. Two Sum - Easy (Google)
  {
    id: 101,
    question: "Two Sum: Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target. You may assume each input has exactly one solution, and you may not use the same element twice.",
    category: "Coding",
    difficulty: "Easy",
    company: "Google",
    isCoding: true,
    language: "javascript",
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}`,
    solutionCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    testCases: [
      { input: "twoSum([2, 7, 11, 15], 9)", expectedOutput: "[0,1]", description: "Basic case: 2 + 7 = 9" },
      { input: "twoSum([3, 2, 4], 6)", expectedOutput: "[1,2]", description: "Numbers not adjacent: 2 + 4 = 6" },
      { input: "twoSum([3, 3], 6)", expectedOutput: "[0,1]", description: "Duplicate numbers: 3 + 3 = 6" },
      { input: "twoSum([1, 5, 8, 3], 4)", expectedOutput: "[0,3]", description: "Non-sequential: 1 + 3 = 4" },
      { input: "twoSum([-1, -2, -3, -4, -5], -8)", expectedOutput: "[2,4]", description: "Negative numbers: -3 + -5 = -8" }
    ],
    tips: [
      "A brute force O(n²) approach checks every pair — but you can do better",
      "Use a hash map to store values you've seen and their indices",
      "For each element, check if target - current exists in the map",
      "This gives O(n) time and O(n) space complexity"
    ],
    sampleAnswer: "Use a hash map: iterate through the array, for each element check if (target - nums[i]) is in the map. If found, return both indices. Otherwise, store current value and index in the map. Time: O(n), Space: O(n).",
    explanation: "The optimal solution uses a hash map (object/Map) for O(1) lookups. As we iterate, we check if the complement (target - current number) has been seen. If yes, we return both indices. If no, we store the current number and its index for future lookups.",
    followUp: "What if you need to return all pairs that sum to the target?",
    timeLimit: 300
  },

  // 2. Reverse String - Easy (Meta)
  {
    id: 102,
    question: "Reverse String: Write a function that reverses a string. The input is given as an array of characters. You must do this by modifying the input array in-place with O(1) extra memory. Return the reversed array.",
    category: "Coding",
    difficulty: "Easy",
    company: "Meta",
    isCoding: true,
    language: "javascript",
    starterCode: `function reverseString(s) {
  // Modify array in-place and return it
  
}`,
    solutionCode: `function reverseString(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
}`,
    testCases: [
      { input: 'reverseString(["h","e","l","l","o"])', expectedOutput: '["o","l","l","e","h"]', description: 'Reverse "hello"' },
      { input: 'reverseString(["H","a","n","n","a","h"])', expectedOutput: '["h","a","n","n","a","H"]', description: 'Reverse "Hannah"' },
      { input: 'reverseString(["a"])', expectedOutput: '["a"]', description: 'Single character' },
      { input: 'reverseString(["a","b"])', expectedOutput: '["b","a"]', description: 'Two characters' },
      { input: 'reverseString(["A","B","C","D","E"])', expectedOutput: '["E","D","C","B","A"]', description: 'Five characters' }
    ],
    tips: [
      "Use two pointers: one at the start, one at the end",
      "Swap characters and move pointers inward",
      "Continue until pointers meet in the middle",
      "This achieves O(n) time with O(1) space"
    ],
    sampleAnswer: "Use the two-pointer technique: initialize left at 0, right at length-1. Swap s[left] and s[right], then increment left and decrement right. Continue until left >= right.",
    explanation: "The two-pointer approach is optimal here. We swap the outermost characters and work inward. This is O(n/2) ≈ O(n) time and only uses a temp variable for swapping, so O(1) extra space.",
    followUp: "How would you reverse words in a sentence while keeping word order?",
    timeLimit: 180
  },

  // 3. FizzBuzz - Easy (Amazon)
  {
    id: 103,
    question: "FizzBuzz: Given an integer n, return a string array answer where: answer[i] == \"FizzBuzz\" if i+1 is divisible by 3 and 5, answer[i] == \"Fizz\" if i+1 is divisible by 3, answer[i] == \"Buzz\" if i+1 is divisible by 5, answer[i] == the string of i+1 if none of the above.",
    category: "Coding",
    difficulty: "Easy",
    company: "Amazon",
    isCoding: true,
    language: "javascript",
    starterCode: `function fizzBuzz(n) {
  // Your code here
  
}`,
    solutionCode: `function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(String(i));
  }
  return result;
}`,
    testCases: [
      { input: "fizzBuzz(3)", expectedOutput: '["1","2","Fizz"]', description: "n=3: basic Fizz" },
      { input: "fizzBuzz(5)", expectedOutput: '["1","2","Fizz","4","Buzz"]', description: "n=5: includes Buzz" },
      { input: "fizzBuzz(15)", expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]', description: "n=15: includes FizzBuzz" },
      { input: "fizzBuzz(1)", expectedOutput: '["1"]', description: "n=1: single element" }
    ],
    tips: [
      "Check divisibility by 15 first (both 3 and 5) before checking 3 and 5 individually",
      "Use the modulo operator (%) to check divisibility",
      "Convert numbers to strings when they don't match any condition",
      "Consider using string concatenation as an alternative approach"
    ],
    sampleAnswer: "Iterate from 1 to n. Check i%15==0 for FizzBuzz, i%3==0 for Fizz, i%5==0 for Buzz, else push the number as string.",
    explanation: "The key insight is checking divisibility by 15 (both 3 and 5) first, then by 3, then by 5. The order matters because if you check 3 first, numbers divisible by both 3 and 5 would be caught as just 'Fizz'.",
    followUp: "How would you make this extensible for arbitrary divisor-word pairs?",
    timeLimit: 180
  },

  // 4. Valid Palindrome - Easy (Microsoft)
  {
    id: 104,
    question: "Valid Palindrome: Given a string s, return true if it is a palindrome considering only alphanumeric characters and ignoring cases. A string is a palindrome if it reads the same forward and backward.",
    category: "Coding",
    difficulty: "Easy",
    company: "Microsoft",
    isCoding: true,
    language: "javascript",
    starterCode: `function isPalindrome(s) {
  // Your code here
  
}`,
    solutionCode: `function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    testCases: [
      { input: 'isPalindrome("A man, a plan, a canal: Panama")', expectedOutput: "true", description: "Classic palindrome with punctuation" },
      { input: 'isPalindrome("race a car")', expectedOutput: "false", description: "Not a palindrome" },
      { input: 'isPalindrome(" ")', expectedOutput: "true", description: "Empty/whitespace is palindrome" },
      { input: 'isPalindrome("abba")', expectedOutput: "true", description: "Simple palindrome" },
      { input: 'isPalindrome("0P")', expectedOutput: "false", description: "Alphanumeric mix" }
    ],
    tips: [
      "First clean the string: lowercase and remove non-alphanumeric characters",
      "Use two pointers from both ends",
      "Compare characters moving inward",
      "Consider using regex to filter characters"
    ],
    sampleAnswer: "Clean the string by converting to lowercase and removing non-alphanumeric chars. Then use two pointers from both ends, comparing characters moving inward. If all match, it's a palindrome.",
    explanation: "First, normalize the string by converting to lowercase and filtering out non-alphanumeric characters. Then use the two-pointer technique to check if the cleaned string reads the same forwards and backwards.",
    followUp: "Can you solve this without creating a new cleaned string?",
    timeLimit: 240
  },

  // 5. Maximum Subarray (Kadane's) - Medium (Google)
  {
    id: 105,
    question: "Maximum Subarray: Given an integer array nums, find the subarray with the largest sum and return its sum. A subarray is a contiguous non-empty sequence of elements.",
    category: "Coding",
    difficulty: "Medium",
    company: "Google",
    isCoding: true,
    language: "javascript",
    starterCode: `function maxSubArray(nums) {
  // Your code here
  
}`,
    solutionCode: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
    testCases: [
      { input: "maxSubArray([-2,1,-3,4,-1,2,1,-5,4])", expectedOutput: "6", description: "Mixed: subarray [4,-1,2,1] = 6" },
      { input: "maxSubArray([1])", expectedOutput: "1", description: "Single element" },
      { input: "maxSubArray([5,4,-1,7,8])", expectedOutput: "23", description: "Entire array is max subarray" },
      { input: "maxSubArray([-1])", expectedOutput: "-1", description: "Single negative element" },
      { input: "maxSubArray([-2,-1])", expectedOutput: "-1", description: "All negative: pick least negative" }
    ],
    tips: [
      "Kadane's Algorithm is the optimal approach",
      "Track current subarray sum and global maximum",
      "At each element, decide: start new subarray or extend current one",
      "Time O(n), Space O(1)"
    ],
    sampleAnswer: "Use Kadane's Algorithm: maintain currentSum and maxSum. For each element, currentSum = max(nums[i], currentSum + nums[i]). Update maxSum = max(maxSum, currentSum). This runs in O(n) time.",
    explanation: "Kadane's Algorithm works by making a simple decision at each element: is it better to start a new subarray here, or extend the existing one? If currentSum + nums[i] < nums[i], we start fresh. We track the global maximum throughout.",
    followUp: "How would you return the actual subarray, not just the sum?",
    timeLimit: 300
  },

  // 6. Merge Two Sorted Lists - Easy (Apple)
  {
    id: 106,
    question: "Merge Two Sorted Arrays: Given two sorted integer arrays nums1 and nums2, return a single sorted array that merges both arrays.",
    category: "Coding",
    difficulty: "Easy",
    company: "Apple",
    isCoding: true,
    language: "javascript",
    starterCode: `function mergeSorted(nums1, nums2) {
  // Your code here
  
}`,
    solutionCode: `function mergeSorted(nums1, nums2) {
  const result = [];
  let i = 0, j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      result.push(nums1[i]);
      i++;
    } else {
      result.push(nums2[j]);
      j++;
    }
  }
  while (i < nums1.length) {
    result.push(nums1[i]);
    i++;
  }
  while (j < nums2.length) {
    result.push(nums2[j]);
    j++;
  }
  return result;
}`,
    testCases: [
      { input: "mergeSorted([1,2,4], [1,3,4])", expectedOutput: "[1,1,2,3,4,4]", description: "Two arrays with overlapping values" },
      { input: "mergeSorted([], [0])", expectedOutput: "[0]", description: "First array empty" },
      { input: "mergeSorted([1], [])", expectedOutput: "[1]", description: "Second array empty" },
      { input: "mergeSorted([1,3,5,7], [2,4,6,8])", expectedOutput: "[1,2,3,4,5,6,7,8]", description: "Interleaving arrays" },
      { input: "mergeSorted([1,1,1], [2,2,2])", expectedOutput: "[1,1,1,2,2,2]", description: "No overlap in values" }
    ],
    tips: [
      "Use two pointers, one for each array",
      "Compare current elements from both arrays",
      "Always pick the smaller one and advance that pointer",
      "Don't forget to append remaining elements after one array is exhausted"
    ],
    sampleAnswer: "Use two pointers i,j starting at 0. Compare nums1[i] and nums2[j], push the smaller one to result and advance that pointer. After one array is exhausted, append the rest of the other.",
    explanation: "The merge step from merge sort. Two pointers walk through both arrays simultaneously. We always pick the smaller element, ensuring the result stays sorted. Time O(n+m), Space O(n+m) for the result.",
    followUp: "How would you merge k sorted arrays efficiently?",
    timeLimit: 240
  },

  // 7. Valid Anagram - Easy (Spotify)
  {
    id: 107,
    question: "Valid Anagram: Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram uses all the original letters exactly once.",
    category: "Coding",
    difficulty: "Easy",
    company: "Spotify",
    isCoding: true,
    language: "javascript",
    starterCode: `function isAnagram(s, t) {
  // Your code here
  
}`,
    solutionCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) {
    count[c] = (count[c] || 0) + 1;
  }
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
    testCases: [
      { input: 'isAnagram("anagram", "nagaram")', expectedOutput: "true", description: "Valid anagram" },
      { input: 'isAnagram("rat", "car")', expectedOutput: "false", description: "Not an anagram" },
      { input: 'isAnagram("a", "a")', expectedOutput: "true", description: "Single char match" },
      { input: 'isAnagram("ab", "a")', expectedOutput: "false", description: "Different lengths" },
      { input: 'isAnagram("listen", "silent")', expectedOutput: "true", description: "Classic anagram pair" }
    ],
    tips: [
      "If lengths differ, it can't be an anagram",
      "Count character frequencies using a hash map",
      "Increment for first string, decrement for second",
      "All counts should be zero at the end"
    ],
    sampleAnswer: "Check lengths first. Use a frequency counter: increment for each char in s, decrement for each char in t. If any count goes negative or non-zero, return false.",
    explanation: "Character counting is the most efficient approach. We build a frequency map from the first string, then decrement counts using the second string. If any count goes below zero, the strings aren't anagrams. Time O(n), Space O(1) since alphabet is finite.",
    followUp: "What if the inputs can contain Unicode characters?",
    timeLimit: 180
  },

  // 8. Binary Search - Easy (Uber)
  {
    id: 108,
    question: "Binary Search: Given a sorted array of integers nums and a target value, return the index of the target. If the target is not found, return -1. You must write an algorithm with O(log n) runtime complexity.",
    category: "Coding",
    difficulty: "Easy",
    company: "Uber",
    isCoding: true,
    language: "javascript",
    starterCode: `function binarySearch(nums, target) {
  // Your code here
  
}`,
    solutionCode: `function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    testCases: [
      { input: "binarySearch([-1,0,3,5,9,12], 9)", expectedOutput: "4", description: "Target exists in array" },
      { input: "binarySearch([-1,0,3,5,9,12], 2)", expectedOutput: "-1", description: "Target not in array" },
      { input: "binarySearch([5], 5)", expectedOutput: "0", description: "Single element found" },
      { input: "binarySearch([1,2,3,4,5], 1)", expectedOutput: "0", description: "Target is first element" },
      { input: "binarySearch([1,2,3,4,5], 5)", expectedOutput: "4", description: "Target is last element" }
    ],
    tips: [
      "Maintain left and right pointers",
      "Calculate mid point and compare with target",
      "Narrow search space by half each iteration",
      "Be careful with the loop condition: left <= right"
    ],
    sampleAnswer: "Initialize left=0, right=length-1. While left <= right: compute mid, if nums[mid] === target return mid. If nums[mid] < target, search right half. Else search left half. Return -1 if not found.",
    explanation: "Binary search works by repeatedly dividing the search interval in half. We compare the target with the middle element and eliminate half of the remaining elements each step. This gives O(log n) time complexity.",
    followUp: "How would you find the first occurrence of a target in an array with duplicates?",
    timeLimit: 180
  },

  // 9. Climbing Stairs - Easy (Stripe)
  {
    id: 109,
    question: "Climbing Stairs: You are climbing a staircase with n steps. Each time you can either climb 1 or 2 steps. Return the number of distinct ways you can climb to the top.",
    category: "Coding",
    difficulty: "Easy",
    company: "Stripe",
    isCoding: true,
    language: "javascript",
    starterCode: `function climbStairs(n) {
  // Your code here
  
}`,
    solutionCode: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1;
  let prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
    testCases: [
      { input: "climbStairs(2)", expectedOutput: "2", description: "2 steps: (1+1) or (2)" },
      { input: "climbStairs(3)", expectedOutput: "3", description: "3 steps: (1+1+1), (1+2), (2+1)" },
      { input: "climbStairs(1)", expectedOutput: "1", description: "1 step: only one way" },
      { input: "climbStairs(5)", expectedOutput: "8", description: "5 steps: 8 combinations" },
      { input: "climbStairs(10)", expectedOutput: "89", description: "10 steps: Fibonacci(10)" }
    ],
    tips: [
      "This is essentially a Fibonacci sequence problem",
      "f(n) = f(n-1) + f(n-2) — you can arrive at step n from step n-1 or n-2",
      "Use dynamic programming to avoid exponential recursion",
      "Optimize space by only keeping the last two values"
    ],
    sampleAnswer: "This is a Fibonacci problem. Ways to reach step n = ways to reach (n-1) + ways to reach (n-2). Use iterative DP with two variables. Time O(n), Space O(1).",
    explanation: "To reach step n, you either came from step n-1 (1 step) or step n-2 (2 steps). So f(n) = f(n-1) + f(n-2), which is the Fibonacci sequence. The iterative approach avoids the exponential time of naive recursion.",
    followUp: "What if you could also climb 3 steps at a time?",
    timeLimit: 240
  },

  // 10. Container With Most Water - Medium (Amazon)
  {
    id: 110,
    question: "Container With Most Water: Given an array of heights, find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water.",
    category: "Coding",
    difficulty: "Medium",
    company: "Amazon",
    isCoding: true,
    language: "javascript",
    starterCode: `function maxArea(height) {
  // Your code here
  
}`,
    solutionCode: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;
  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, width * h);
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}`,
    testCases: [
      { input: "maxArea([1,8,6,2,5,4,8,3,7])", expectedOutput: "49", description: "Standard case: lines at index 1 and 8" },
      { input: "maxArea([1,1])", expectedOutput: "1", description: "Minimum case: two lines" },
      { input: "maxArea([4,3,2,1,4])", expectedOutput: "16", description: "Same height lines at edges" },
      { input: "maxArea([1,2,1])", expectedOutput: "2", description: "Three lines" },
      { input: "maxArea([2,3,10,5,7,8,9])", expectedOutput: "36", description: "Taller lines in middle" }
    ],
    tips: [
      "Start with the widest container (two pointers at extremes)",
      "Move the pointer pointing to the shorter line inward",
      "Moving the shorter line might find a taller one, increasing area",
      "Moving the taller line can only decrease width without height benefit"
    ],
    sampleAnswer: "Two pointers start at both ends. Calculate area = min(height[left], height[right]) * (right - left). Move the shorter side inward. Track maximum area. Time O(n), Space O(1).",
    explanation: "The greedy two-pointer approach works because moving the shorter line inward is the only way to potentially find a larger area. Moving the taller line would only reduce width and can't increase the height (which is limited by the shorter line).",
    followUp: "What if you need to find the two lines that form a container and also support a third line between them?",
    timeLimit: 300
  },

  // 11. Group Anagrams - Medium (Meta)
  {
    id: 111,
    question: "Group Anagrams: Given an array of strings, group the anagrams together. You can return the answer in any order. An anagram is a word formed by rearranging the letters of another word.",
    category: "Coding",
    difficulty: "Medium",
    company: "Meta",
    isCoding: true,
    language: "javascript",
    starterCode: `function groupAnagrams(strs) {
  // Your code here
  
}`,
    solutionCode: `function groupAnagrams(strs) {
  const map = {};
  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map[key]) map[key] = [];
    map[key].push(str);
  }
  return Object.values(map);
}`,
    testCases: [
      { input: 'groupAnagrams(["eat","tea","tan","ate","nat","bat"])', expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]', description: "Standard grouping" },
      { input: 'groupAnagrams([""])', expectedOutput: '[[""]]', description: "Single empty string" },
      { input: 'groupAnagrams(["a"])', expectedOutput: '[["a"]]', description: "Single character" },
      { input: 'groupAnagrams(["abc","bca","cab","xyz","zyx"])', expectedOutput: '[["abc","bca","cab"],["xyz","zyx"]]', description: "Two anagram groups" }
    ],
    tips: [
      "Sort each string's characters to create a canonical key",
      "Anagrams will have the same sorted key",
      "Use a hash map to group strings by their key",
      "Alternative: use character frequency as the key"
    ],
    sampleAnswer: "Sort each string alphabetically to create a key. Use a hash map: key = sorted string, value = array of original strings. Return all values. Time O(n * k log k) where k is max string length.",
    explanation: "Anagrams, when sorted alphabetically, produce the same string. We use this as a hash key to group them together. For example, 'eat', 'tea', 'ate' all sort to 'aet'.",
    followUp: "Can you solve this without sorting, using character counts as the key?",
    timeLimit: 300
  },

  // 12. Longest Substring Without Repeating Characters - Medium (Netflix)
  {
    id: 112,
    question: "Longest Substring Without Repeating Characters: Given a string s, find the length of the longest substring without repeating characters.",
    category: "Coding",
    difficulty: "Medium",
    company: "Netflix",
    isCoding: true,
    language: "javascript",
    starterCode: `function lengthOfLongestSubstring(s) {
  // Your code here
  
}`,
    solutionCode: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (seen.has(s[i]) && seen.get(s[i]) >= start) {
      start = seen.get(s[i]) + 1;
    }
    seen.set(s[i], i);
    maxLen = Math.max(maxLen, i - start + 1);
  }
  return maxLen;
}`,
    testCases: [
      { input: 'lengthOfLongestSubstring("abcabcbb")', expectedOutput: "3", description: '"abc" is the longest' },
      { input: 'lengthOfLongestSubstring("bbbbb")', expectedOutput: "1", description: "All same characters" },
      { input: 'lengthOfLongestSubstring("pwwkew")', expectedOutput: "3", description: '"wke" is the longest' },
      { input: 'lengthOfLongestSubstring("")', expectedOutput: "0", description: "Empty string" },
      { input: 'lengthOfLongestSubstring("abcdef")', expectedOutput: "6", description: "All unique characters" }
    ],
    tips: [
      "Use the sliding window technique",
      "Maintain a set or map of characters in the current window",
      "When a duplicate is found, shrink the window from the left",
      "Track the maximum window size seen"
    ],
    sampleAnswer: "Sliding window with a hash map. Track the last index of each character. When a duplicate is found within the window, move the start past the previous occurrence. Track max length throughout. Time O(n), Space O(min(n, alphabet size)).",
    explanation: "The sliding window approach maintains a window [start, i] of unique characters. When we encounter a character already in the window, we move start to just past its previous position. The map stores the most recent index of each character for O(1) lookups.",
    followUp: "What if you need to return the actual substring, not just its length?",
    timeLimit: 300
  },

  // 13. Product of Array Except Self - Medium (Apple)
  {
    id: 113,
    question: "Product of Array Except Self: Given an integer array nums, return an array where each element is the product of all elements except the one at that index. You must solve it without using division and in O(n) time.",
    category: "Coding",
    difficulty: "Medium",
    company: "Apple",
    isCoding: true,
    language: "javascript",
    starterCode: `function productExceptSelf(nums) {
  // Your code here
  
}`,
    solutionCode: `function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}`,
    testCases: [
      { input: "productExceptSelf([1,2,3,4])", expectedOutput: "[24,12,8,6]", description: "Standard case" },
      { input: "productExceptSelf([-1,1,0,-3,3])", expectedOutput: "[0,0,9,0,0]", description: "Contains zero" },
      { input: "productExceptSelf([2,3])", expectedOutput: "[3,2]", description: "Two elements" },
      { input: "productExceptSelf([1,1,1,1])", expectedOutput: "[1,1,1,1]", description: "All ones" }
    ],
    tips: [
      "Can't use division — what if there's a zero?",
      "Use prefix and suffix products",
      "First pass: compute prefix products (product of all elements to the left)",
      "Second pass: multiply by suffix products (product of all elements to the right)"
    ],
    sampleAnswer: "Use two passes. First pass builds prefix products left to right. Second pass multiplies by suffix products right to left. Each element gets (product of all left elements) × (product of all right elements). Time O(n), Space O(1) extra.",
    explanation: "For each index i, the answer is (product of all elements before i) × (product of all elements after i). We compute prefix products in one pass and suffix products in another, combining them in the result array.",
    followUp: "What if the array contains very large numbers that might overflow?",
    timeLimit: 300
  },

  // 14. Find Missing Number - Easy (Airbnb)
  {
    id: 114,
    question: "Missing Number: Given an array nums containing n distinct numbers in the range [0, n], return the one number that is missing from the array.",
    category: "Coding",
    difficulty: "Easy",
    company: "Airbnb",
    isCoding: true,
    language: "javascript",
    starterCode: `function missingNumber(nums) {
  // Your code here
  
}`,
    solutionCode: `function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}`,
    testCases: [
      { input: "missingNumber([3,0,1])", expectedOutput: "2", description: "Missing 2 from [0,1,2,3]" },
      { input: "missingNumber([0,1])", expectedOutput: "2", description: "Missing last number" },
      { input: "missingNumber([9,6,4,2,3,5,7,0,1])", expectedOutput: "8", description: "Missing 8 from large array" },
      { input: "missingNumber([0])", expectedOutput: "1", description: "Missing 1 from [0,1]" },
      { input: "missingNumber([1])", expectedOutput: "0", description: "Missing 0" }
    ],
    tips: [
      "Use Gauss's formula: sum of 0 to n = n*(n+1)/2",
      "Subtract actual array sum from expected sum",
      "Alternative: use XOR — XOR all indices with all values",
      "Both approaches are O(n) time, O(1) space"
    ],
    sampleAnswer: "Use Gauss's formula for sum 0 to n: n*(n+1)/2. Subtract the actual array sum. The difference is the missing number. Time O(n), Space O(1).",
    explanation: "Gauss's formula gives us the expected sum of numbers 0 through n. By subtracting the actual sum of the array, we get the missing number. This is O(n) time and O(1) space. An alternative XOR approach also works.",
    followUp: "What if two numbers are missing? How would you find both?",
    timeLimit: 180
  },

  // 15. Flatten Nested Array - Medium (Uber)
  {
    id: 115,
    question: "Flatten Array: Write a function that takes a nested array and returns a flat array with all values at the top level. For example, [1, [2, [3, 4]], 5] becomes [1, 2, 3, 4, 5].",
    category: "Coding",
    difficulty: "Medium",
    company: "Uber",
    isCoding: true,
    language: "javascript",
    starterCode: `function flattenArray(arr) {
  // Your code here
  
}`,
    solutionCode: `function flattenArray(arr) {
  const result = [];
  function helper(items) {
    for (const item of items) {
      if (Array.isArray(item)) {
        helper(item);
      } else {
        result.push(item);
      }
    }
  }
  helper(arr);
  return result;
}`,
    testCases: [
      { input: "flattenArray([1, [2, [3, 4]], 5])", expectedOutput: "[1,2,3,4,5]", description: "Nested 3 levels deep" },
      { input: "flattenArray([1, 2, 3])", expectedOutput: "[1,2,3]", description: "Already flat" },
      { input: "flattenArray([[1], [2], [3]])", expectedOutput: "[1,2,3]", description: "One level of nesting" },
      { input: "flattenArray([[[1]], [[2]], [[3]]])", expectedOutput: "[1,2,3]", description: "Two levels of nesting" },
      { input: "flattenArray([])", expectedOutput: "[]", description: "Empty array" }
    ],
    tips: [
      "Use recursion: if element is an array, recurse into it",
      "If element is not an array, push to result",
      "Alternative: use a stack-based iterative approach",
      "Consider Array.isArray() to check for arrays"
    ],
    sampleAnswer: "Recursively iterate through the array. If an element is an array, recurse into it. If it's a value, push to the result. Time O(n) where n is total number of elements, Space O(d) for recursion depth.",
    explanation: "The recursive approach naturally handles arbitrary nesting depth. For each element, we check if it's an array (recurse) or a value (add to result). The iterative approach using a stack is also valid and avoids stack overflow for very deep nesting.",
    followUp: "How would you flatten only to a specific depth?",
    timeLimit: 240
  },

  // 16. String Compression - Medium (Microsoft)
  {
    id: 116,
    question: "String Compression: Implement a function to perform basic string compression using counts of repeated characters. For example, 'aabcccccaaa' becomes 'a2b1c5a3'. If the compressed string is not shorter than the original, return the original string.",
    category: "Coding",
    difficulty: "Medium",
    company: "Microsoft",
    isCoding: true,
    language: "javascript",
    starterCode: `function compressString(s) {
  // Your code here
  
}`,
    solutionCode: `function compressString(s) {
  if (s.length === 0) return s;
  let compressed = '';
  let count = 1;
  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      compressed += s[i - 1] + count;
      count = 1;
    }
  }
  return compressed.length < s.length ? compressed : s;
}`,
    testCases: [
      { input: 'compressString("aabcccccaaa")', expectedOutput: '"a2b1c5a3"', description: "Standard compression" },
      { input: 'compressString("abcdef")', expectedOutput: '"abcdef"', description: "No compression benefit — return original" },
      { input: 'compressString("aaa")', expectedOutput: '"a3"', description: "All same character" },
      { input: 'compressString("a")', expectedOutput: '"a"', description: "Single character — return original" },
      { input: 'compressString("aaabbcccc")', expectedOutput: '"a3b2c4"', description: "Multiple groups" }
    ],
    tips: [
      "Walk through the string tracking the current character and its count",
      "When the character changes, append char+count to result",
      "Don't forget the last group of characters",
      "Compare lengths at the end to decide what to return"
    ],
    sampleAnswer: "Iterate through the string, counting consecutive identical characters. When a new character is encountered, append the previous character and its count to the result. At the end, return the shorter of the original and compressed strings.",
    explanation: "We traverse the string once, counting runs of identical characters. Each time the character changes (or we reach the end), we append the character and its count. Finally, we only return the compressed version if it's actually shorter.",
    followUp: "How would you decompress the string back to the original?",
    timeLimit: 240
  },

  // 17. Matrix Diagonal Sum - Easy (Netflix)
  {
    id: 117,
    question: "Matrix Diagonal Sum: Given a square matrix, return the sum of the primary diagonal and the secondary diagonal elements. If an element is on both diagonals (center of odd-sized matrix), count it only once.",
    category: "Coding",
    difficulty: "Easy",
    company: "Netflix",
    isCoding: true,
    language: "javascript",
    starterCode: `function diagonalSum(mat) {
  // Your code here
  
}`,
    solutionCode: `function diagonalSum(mat) {
  const n = mat.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += mat[i][i];
    sum += mat[i][n - 1 - i];
  }
  if (n % 2 === 1) {
    sum -= mat[Math.floor(n / 2)][Math.floor(n / 2)];
  }
  return sum;
}`,
    testCases: [
      { input: "diagonalSum([[1,2,3],[4,5,6],[7,8,9]])", expectedOutput: "25", description: "3x3 matrix" },
      { input: "diagonalSum([[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]])", expectedOutput: "8", description: "4x4 all ones" },
      { input: "diagonalSum([[5]])", expectedOutput: "5", description: "1x1 matrix" },
      { input: "diagonalSum([[1,2],[3,4]])", expectedOutput: "10", description: "2x2 matrix" }
    ],
    tips: [
      "Primary diagonal: mat[i][i]",
      "Secondary diagonal: mat[i][n-1-i]",
      "For odd n, the center element is on both diagonals",
      "Subtract the center element once if n is odd"
    ],
    sampleAnswer: "Iterate once: add mat[i][i] (primary) and mat[i][n-1-i] (secondary). If n is odd, subtract the center element once (it was counted twice). Time O(n), Space O(1).",
    explanation: "We iterate through each row once, adding both diagonal elements. The primary diagonal has elements at (i,i) and the secondary at (i, n-1-i). For odd-sized matrices, the center element appears on both diagonals, so we subtract it once.",
    followUp: "How would you compute the sum of all diagonals (not just main and anti)?",
    timeLimit: 180
  },

  // 18. Debounce Function - Medium (Stripe)
  {
    id: 118,
    question: "Implement Debounce: Write a debounce function that delays invoking the provided function until after `wait` milliseconds have elapsed since the last time it was invoked. It should return a function that, when called, resets the timer.",
    category: "Coding",
    difficulty: "Medium",
    company: "Stripe",
    isCoding: true,
    language: "javascript",
    starterCode: `function debounce(func, wait) {
  // Your code here — return a debounced function
  
}`,
    solutionCode: `function debounce(func, wait) {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, wait);
  };
}`,
    testCases: [
      { input: "typeof debounce(() => {}, 100)", expectedOutput: '"function"', description: "Returns a function" },
      { input: "typeof debounce(() => {}, 0)", expectedOutput: '"function"', description: "Works with 0ms delay" },
      { input: "debounce((x) => x * 2, 100).length", expectedOutput: "0", description: "Returned function uses rest params" },
      { input: "(function() { let r = null; const d = debounce((v) => { r = v; }, 0); d(42); return typeof d; })()", expectedOutput: '"function"', description: "Debounced function is callable" }
    ],
    tips: [
      "Use setTimeout and clearTimeout",
      "Store the timeout ID in a closure variable",
      "Clear any existing timeout before setting a new one",
      "Use apply/call to preserve the context (this) and arguments"
    ],
    sampleAnswer: "Use a closure to store a timeout ID. Each call clears the previous timeout and sets a new one. The function only fires after the wait period with no new calls. Use apply to forward arguments and context.",
    explanation: "Debouncing uses closure to maintain a timer reference. Each invocation clears the previous timer and sets a new one. The actual function only executes when no new calls occur within the wait period. This is fundamental for optimizing event handlers like search inputs.",
    followUp: "How would you add a 'leading' option that fires immediately on the first call?",
    timeLimit: 300
  },

  // ===== CLEVERCARE HEALTH PLAN QUESTIONS =====

  // CleverCare - Behavioral
  {
    id: 200,
    question: "Tell me about a time when you had to explain complex healthcare information to a patient or customer who was confused about their coverage. How did you handle it?",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Healthcare Company",
    tips: [
      "Focus on empathy and patience in your approach",
      "Highlight how you simplified complex insurance terminology",
      "Show the outcome and member satisfaction"
    ],
    sampleAnswer: "A member was confused about their deductible vs out-of-pocket maximum. I used a simple analogy comparing it to a bucket that fills up, created a visual breakdown of their costs, and walked through a real claim example. The member thanked me for making it clear, and I documented tips for our knowledge base to help other reps.",
    followUp: "How do you stay updated on changing healthcare policies and regulations?",
    timeLimit: 180
  },
  {
    id: 201,
    question: "Describe a situation where you identified a process improvement opportunity in healthcare operations. What was your approach and the outcome?",
    category: "Behavioral",
    difficulty: "Medium",
    company: "Healthcare Company",
    tips: [
      "Focus on data-driven identification of the problem",
      "Explain how you balanced compliance with efficiency",
      "Quantify the impact on operations or member experience"
    ],
    sampleAnswer: "I noticed our prior authorization process had a 5-day average turnaround. I analyzed the workflow, found bottlenecks in manual data entry, proposed an automated eligibility check integration, piloted it with one care team, and reduced turnaround to 2 days. This improved provider satisfaction scores by 25%.",
    followUp: "How do you ensure process changes remain HIPAA compliant?",
    timeLimit: 180
  },
  {
    id: 202,
    question: "How would you design a member portal for a health plan that serves both young tech-savvy members and elderly members with limited digital experience?",
    category: "System Design",
    difficulty: "Hard",
    company: "Healthcare Company",
    tips: [
      "Consider accessibility standards (WCAG compliance)",
      "Think about multiple interaction modalities",
      "Address security while maintaining usability"
    ],
    sampleAnswer: "I'd design with: 1) Responsive design with large, high-contrast UI options, 2) Voice-guided navigation and screen reader support, 3) Simplified 'Essential' mode vs 'Advanced' mode, 4) Multi-factor auth with phone call option for elderly, 5) Integrated chat support with human handoff, 6) Video tutorials and tooltips for complex features.",
    followUp: "How would you handle members who prefer phone-only interactions?",
    timeLimit: 300
  },
  {
    id: 203,
    question: "A provider network contract is expiring in 30 days, and negotiations are stalled. Members are anxious about losing access to their doctors. How would you handle communication and contingency planning?",
    category: "Situational",
    difficulty: "Hard",
    company: "Healthcare Company",
    tips: [
      "Balance transparency with avoiding panic",
      "Consider regulatory notification requirements",
      "Plan for multiple scenarios"
    ],
    sampleAnswer: "1) Immediately assess impact: how many members, critical care situations, 2) Prepare tiered communication: general awareness + personalized outreach for high-impact members, 3) Identify alternative in-network providers and transition support, 4) Work with legal on continuity of care provisions, 5) Set up dedicated support line, 6) Keep negotiating while executing contingency.",
    followUp: "How would you handle social media backlash during this situation?",
    timeLimit: 240
  },
  {
    id: 204,
    question: "Explain how you would ensure data security and HIPAA compliance when building a new healthcare application that integrates with multiple external systems.",
    category: "Technical",
    difficulty: "Hard",
    company: "Healthcare Company",
    tips: [
      "Address encryption at rest and in transit",
      "Discuss access controls and audit logging",
      "Consider BAA requirements with vendors"
    ],
    sampleAnswer: "Key measures: 1) End-to-end encryption (TLS 1.3, AES-256), 2) Role-based access control with minimum necessary principle, 3) Comprehensive audit logging of all PHI access, 4) BAA agreements with all vendors, 5) Regular penetration testing and vulnerability scanning, 6) Data tokenization for external integrations, 7) Automated compliance monitoring dashboards.",
    followUp: "How would you handle a potential data breach notification process?",
    timeLimit: 240
  },

  // ===== SQL CODING QUESTIONS - HEALTHCARE FOCUSED =====

  // SQL 1 - Easy: Chronic Disease Registry
  {
    id: 301,
    question: "SQL: Chronic Disease Registry - Write a SQL query to identify all diabetic members (diagnosis_code starting with 'E11') who have NOT had an HbA1c lab test in the last 6 months. These members need outreach for care gap closure. Return member_id, member_name, last_hba1c_date, and days_since_last_test. Tables: members(member_id, member_name, date_of_birth), diagnoses(diagnosis_id, member_id, diagnosis_code, diagnosis_date), lab_results(lab_id, member_id, test_code, result_date, result_value) where HbA1c test_code = 'HBA1C'",
    category: "SQL",
    difficulty: "Easy",
    company: "Healthcare Company",
    isCoding: true,
    language: "sql",
    starterCode: `-- Find diabetic members missing HbA1c tests
-- Diabetes ICD-10 codes start with 'E11'
-- HbA1c test_code = 'HBA1C'
SELECT 
  -- your columns
FROM members m
-- your joins and conditions
`,
    solutionCode: `SELECT 
  m.member_id,
  m.member_name,
  MAX(l.result_date) AS last_hba1c_date,
  DATEDIFF(CURRENT_DATE, MAX(l.result_date)) AS days_since_last_test
FROM members m
INNER JOIN diagnoses d ON m.member_id = d.member_id
LEFT JOIN lab_results l ON m.member_id = l.member_id AND l.test_code = 'HBA1C'
WHERE d.diagnosis_code LIKE 'E11%'
GROUP BY m.member_id, m.member_name
HAVING MAX(l.result_date) IS NULL 
   OR MAX(l.result_date) < DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
ORDER BY days_since_last_test DESC NULLS FIRST;`,
    testCases: [
      { input: "Query structure check", expectedOutput: "Uses JOIN with diagnoses and LEFT JOIN with labs", description: "Correct join strategy" },
      { input: "Diabetes filter check", expectedOutput: "WHERE diagnosis_code LIKE 'E11%'", description: "Correctly filters diabetic members" },
      { input: "Care gap logic check", expectedOutput: "HAVING for 6-month gap", description: "Identifies members with care gaps" }
    ],
    tips: [
      "Use LEFT JOIN for lab_results to include members with NO tests",
      "LIKE 'E11%' matches all Type 2 Diabetes ICD-10 codes",
      "HAVING with IS NULL catches members who never had the test",
      "DATEDIFF calculates days between dates"
    ],
    sampleAnswer: "Join members with diagnoses to find diabetics, LEFT JOIN with labs to include those without tests. Use HAVING to filter for NULL or dates older than 6 months.",
    explanation: "This query supports HEDIS quality measure compliance (HbA1c testing for diabetics). LEFT JOIN is critical to include members with no lab records. The HAVING clause handles both NULL dates and old dates.",
    followUp: "How would you also include the most recent HbA1c value for members who have been tested?",
    timeLimit: 300
  },

  // SQL 2 - Medium: Hospital Readmission Analysis
  {
    id: 302,
    question: "SQL: 30-Day Hospital Readmission Rate - Calculate the 30-day all-cause readmission rate by admitting hospital. A readmission is when a member is admitted again within 30 days of a previous discharge. Return hospital_name, total_discharges, readmissions, and readmission_rate (percentage). Exclude planned readmissions (admission_type = 'planned'). Tables: admissions(admission_id, member_id, hospital_id, admit_date, discharge_date, admission_type), hospitals(hospital_id, hospital_name)",
    category: "SQL",
    difficulty: "Medium",
    company: "Healthcare Company",
    isCoding: true,
    language: "sql",
    starterCode: `-- Calculate 30-day readmission rates by hospital
-- A readmission = new admission within 30 days of prior discharge
-- Exclude admission_type = 'planned'
SELECT
  -- your columns with calculations
FROM hospitals h
-- your joins and logic
`,
    solutionCode: `WITH discharge_with_readmit AS (
  SELECT 
    a1.admission_id,
    a1.hospital_id,
    a1.member_id,
    a1.discharge_date,
    CASE 
      WHEN EXISTS (
        SELECT 1 FROM admissions a2 
        WHERE a2.member_id = a1.member_id
          AND a2.admission_type != 'planned'
          AND a2.admit_date > a1.discharge_date
          AND a2.admit_date <= DATE_ADD(a1.discharge_date, INTERVAL 30 DAY)
      ) THEN 1 
      ELSE 0 
    END AS had_readmission
  FROM admissions a1
  WHERE a1.discharge_date IS NOT NULL
)
SELECT 
  h.hospital_name,
  COUNT(*) AS total_discharges,
  SUM(d.had_readmission) AS readmissions,
  ROUND(SUM(d.had_readmission) * 100.0 / COUNT(*), 2) AS readmission_rate
FROM hospitals h
INNER JOIN discharge_with_readmit d ON h.hospital_id = d.hospital_id
GROUP BY h.hospital_id, h.hospital_name
HAVING COUNT(*) >= 30
ORDER BY readmission_rate DESC;`,
    testCases: [
      { input: "Readmission logic check", expectedOutput: "Checks 30-day window correctly", description: "Identifies readmissions within 30 days" },
      { input: "Exclusion check", expectedOutput: "Excludes planned admissions", description: "Excludes planned readmissions" },
      { input: "Rate calculation", expectedOutput: "Calculates percentage correctly", description: "Readmission rate as percentage" }
    ],
    tips: [
      "Use a CTE to first flag each discharge as having a readmission or not",
      "EXISTS subquery efficiently checks for subsequent admissions",
      "The 30-day window: admit_date > discharge_date AND admit_date <= discharge_date + 30",
      "Exclude planned admissions from the readmission check"
    ],
    sampleAnswer: "Use CTE with EXISTS to check if each discharge has an unplanned readmission within 30 days. Then aggregate by hospital to calculate rates.",
    explanation: "Hospital readmission rates are a key CMS quality metric. This query uses EXISTS for efficient correlated subquery checking. The 30-day window calculation must handle the edge cases of same-day discharge/admit correctly.",
    followUp: "How would you identify the top 5 diagnosis codes contributing to readmissions?",
    timeLimit: 420
  },

  // SQL 3 - Medium: Medication Adherence (PDC Calculation)
  {
    id: 303,
    question: "SQL: Medication Adherence PDC - Calculate Proportion of Days Covered (PDC) for statin medications by member. PDC = (Days with medication on hand / Days in measurement period) × 100. A member is considered adherent if PDC >= 80%. Return member_id, member_name, total_days_supply, days_in_period, pdc_percentage, and adherence_status. Tables: members(member_id, member_name), prescriptions(rx_id, member_id, drug_class, fill_date, days_supply) where drug_class = 'STATIN'. Measurement period: Jan 1 - Dec 31, 2024.",
    category: "SQL",
    difficulty: "Medium",
    company: "Healthcare Company",
    isCoding: true,
    language: "sql",
    starterCode: `-- Calculate PDC (Proportion of Days Covered) for statins
-- PDC = days covered / days in period * 100
-- Adherent if PDC >= 80%
-- Measurement period: 2024
SELECT
  -- your columns
FROM members m
-- your PDC calculation logic
`,
    solutionCode: `WITH statin_fills AS (
  SELECT 
    member_id,
    fill_date,
    days_supply,
    -- Calculate coverage end date for each fill
    DATE_ADD(fill_date, INTERVAL days_supply DAY) AS coverage_end_date
  FROM prescriptions
  WHERE drug_class = 'STATIN'
    AND fill_date >= '2024-01-01'
    AND fill_date <= '2024-12-31'
),
member_coverage AS (
  SELECT 
    member_id,
    SUM(days_supply) AS total_days_supply,
    -- Cap total days at period length (365) to handle overlaps
    LEAST(SUM(days_supply), 365) AS covered_days_capped
  FROM statin_fills
  GROUP BY member_id
)
SELECT 
  m.member_id,
  m.member_name,
  COALESCE(mc.total_days_supply, 0) AS total_days_supply,
  365 AS days_in_period,
  ROUND(COALESCE(mc.covered_days_capped, 0) * 100.0 / 365, 2) AS pdc_percentage,
  CASE 
    WHEN COALESCE(mc.covered_days_capped, 0) * 100.0 / 365 >= 80 THEN 'Adherent'
    ELSE 'Non-Adherent'
  END AS adherence_status
FROM members m
INNER JOIN statin_fills sf ON m.member_id = sf.member_id
LEFT JOIN member_coverage mc ON m.member_id = mc.member_id
GROUP BY m.member_id, m.member_name, mc.total_days_supply, mc.covered_days_capped
ORDER BY pdc_percentage DESC;`,
    testCases: [
      { input: "PDC formula check", expectedOutput: "PDC = covered days / 365 * 100", description: "Correct PDC calculation" },
      { input: "Adherence threshold", expectedOutput: "PDC >= 80 = Adherent", description: "80% threshold applied" },
      { input: "Drug class filter", expectedOutput: "Filters for STATIN", description: "Filters statin prescriptions only" }
    ],
    tips: [
      "PDC is a HEDIS/CMS Star Rating measure",
      "Sum days_supply for each member's fills in the period",
      "Cap at 365 days since PDC cannot exceed 100%",
      "LEAST function caps the value at period length"
    ],
    sampleAnswer: "Sum days_supply for each member's statin fills in 2024. Divide by 365 for PDC percentage. Cap at 100%. Mark as Adherent if >= 80%.",
    explanation: "PDC is a critical medication adherence measure used in CMS Star Ratings. This simplified version sums days supply - a more precise calculation would track actual covered days accounting for overlapping fills and early refills.",
    followUp: "How would you handle overlapping fills where a member refills before their current supply runs out?",
    timeLimit: 360
  },

  // SQL 4 - Hard: PMPM Cost Trend Analysis
  {
    id: 304,
    question: "SQL: PMPM Cost Trend Analysis - Calculate Per Member Per Month (PMPM) costs with month-over-month and year-over-year trends. Return year_month, total_claims_cost, member_months, pmpm, mom_change_pct, and yoy_change_pct. Tables: claims(claim_id, member_id, service_date, paid_amount), member_eligibility(member_id, eligibility_month) where eligibility_month is 'YYYY-MM' format",
    category: "SQL",
    difficulty: "Hard",
    company: "Healthcare Company",
    isCoding: true,
    language: "sql",
    starterCode: `-- Calculate PMPM with month-over-month and year-over-year trends
-- PMPM = Total Paid Amount / Member Months
-- Include MoM% and YoY% change
SELECT
  -- your columns with window functions for trends
FROM claims c
-- your aggregation and trend calculation logic
`,
    solutionCode: `WITH monthly_metrics AS (
  SELECT 
    DATE_FORMAT(c.service_date, '%Y-%m') AS year_month,
    SUM(c.paid_amount) AS total_claims_cost,
    COUNT(DISTINCT e.member_id) AS member_months
  FROM claims c
  INNER JOIN member_eligibility e 
    ON c.member_id = e.member_id 
    AND DATE_FORMAT(c.service_date, '%Y-%m') = e.eligibility_month
  GROUP BY DATE_FORMAT(c.service_date, '%Y-%m')
),
pmpm_with_trends AS (
  SELECT 
    year_month,
    total_claims_cost,
    member_months,
    ROUND(total_claims_cost / member_months, 2) AS pmpm,
    LAG(total_claims_cost / member_months, 1) OVER (ORDER BY year_month) AS prev_month_pmpm,
    LAG(total_claims_cost / member_months, 12) OVER (ORDER BY year_month) AS prev_year_pmpm
  FROM monthly_metrics
)
SELECT 
  year_month,
  total_claims_cost,
  member_months,
  pmpm,
  ROUND((pmpm - prev_month_pmpm) / prev_month_pmpm * 100, 2) AS mom_change_pct,
  ROUND((pmpm - prev_year_pmpm) / prev_year_pmpm * 100, 2) AS yoy_change_pct
FROM pmpm_with_trends
ORDER BY year_month;`,
    testCases: [
      { input: "PMPM calculation", expectedOutput: "PMPM = total cost / member months", description: "Correct PMPM formula" },
      { input: "LAG window function", expectedOutput: "Uses LAG for prior periods", description: "Uses LAG for trend calculation" },
      { input: "MoM calculation", expectedOutput: "(current - prior) / prior * 100", description: "Correct month-over-month calculation" }
    ],
    tips: [
      "PMPM (Per Member Per Month) is a key healthcare financial metric",
      "LAG() window function accesses previous row values",
      "LAG(value, 1) = previous month, LAG(value, 12) = same month last year",
      "Use CTEs to break down complex calculations into steps"
    ],
    sampleAnswer: "Calculate monthly totals and member counts first. Then use LAG window function to get prior month and prior year values. Calculate percentage changes in final SELECT.",
    explanation: "PMPM is fundamental to health plan financial analysis. LAG(value, 12) elegantly retrieves the value from 12 rows back (same month previous year) without complex self-joins. CTEs make the multi-step calculation readable.",
    followUp: "How would you break down PMPM by claim type (inpatient, outpatient, pharmacy, professional)?",
    timeLimit: 420
  },

  // SQL 5 - Hard: Care Gap Closure Tracking
  {
    id: 305,
    question: "SQL: HEDIS Care Gap Closure - Track care gap closure rates for key quality measures. Calculate the percentage of eligible members who have closed each care gap (Breast Cancer Screening, Colorectal Cancer Screening, Annual Wellness Visit). Return measure_name, eligible_members, gaps_closed, closure_rate, and change_from_prior_month. Tables: quality_measures(measure_id, measure_name), member_measure_status(member_id, measure_id, is_eligible, is_closed, status_date)",
    category: "SQL",
    difficulty: "Hard",
    company: "Healthcare Company",
    isCoding: true,
    language: "sql",
    starterCode: `-- Calculate HEDIS care gap closure rates with monthly trend
-- Measures: Breast Cancer Screening (BCS), Colorectal Cancer Screening (COL), Annual Wellness Visit (AWV)
-- Show current closure rate and change from prior month
SELECT
  -- your columns with closure rates and trends
FROM quality_measures qm
-- your aggregation and trend logic
`,
    solutionCode: `WITH current_month AS (
  SELECT 
    qm.measure_id,
    qm.measure_name,
    COUNT(CASE WHEN mms.is_eligible = 1 THEN 1 END) AS eligible_members,
    COUNT(CASE WHEN mms.is_eligible = 1 AND mms.is_closed = 1 THEN 1 END) AS gaps_closed
  FROM quality_measures qm
  LEFT JOIN member_measure_status mms ON qm.measure_id = mms.measure_id
  WHERE mms.status_date = (SELECT MAX(status_date) FROM member_measure_status)
  GROUP BY qm.measure_id, qm.measure_name
),
prior_month AS (
  SELECT 
    qm.measure_id,
    COUNT(CASE WHEN mms.is_eligible = 1 AND mms.is_closed = 1 THEN 1 END) * 100.0 / 
    NULLIF(COUNT(CASE WHEN mms.is_eligible = 1 THEN 1 END), 0) AS prior_closure_rate
  FROM quality_measures qm
  LEFT JOIN member_measure_status mms ON qm.measure_id = mms.measure_id
  WHERE mms.status_date = DATE_SUB(
    (SELECT MAX(status_date) FROM member_measure_status), 
    INTERVAL 1 MONTH
  )
  GROUP BY qm.measure_id
)
SELECT 
  cm.measure_name,
  cm.eligible_members,
  cm.gaps_closed,
  ROUND(cm.gaps_closed * 100.0 / NULLIF(cm.eligible_members, 0), 2) AS closure_rate,
  ROUND(
    (cm.gaps_closed * 100.0 / NULLIF(cm.eligible_members, 0)) - pm.prior_closure_rate, 
    2
  ) AS change_from_prior_month,
  CASE 
    WHEN cm.gaps_closed * 100.0 / NULLIF(cm.eligible_members, 0) >= 80 THEN '5 Star'
    WHEN cm.gaps_closed * 100.0 / NULLIF(cm.eligible_members, 0) >= 60 THEN '4 Star'
    WHEN cm.gaps_closed * 100.0 / NULLIF(cm.eligible_members, 0) >= 40 THEN '3 Star'
    ELSE 'Below 3 Star'
  END AS star_rating_estimate
FROM current_month cm
LEFT JOIN prior_month pm ON cm.measure_id = pm.measure_id
ORDER BY closure_rate DESC;`,
    testCases: [
      { input: "Closure rate formula", expectedOutput: "gaps_closed / eligible_members * 100", description: "Correct closure rate calculation" },
      { input: "Month comparison", expectedOutput: "Compares current to prior month", description: "Monthly trend calculated" },
      { input: "Star rating logic", expectedOutput: "CASE for star thresholds", description: "Estimates star rating based on thresholds" }
    ],
    tips: [
      "HEDIS measures drive CMS Star Ratings for Medicare Advantage plans",
      "NULLIF prevents division by zero when no eligible members exist",
      "Use CTEs to separate current vs prior period calculations",
      "Star Rating thresholds vary by measure - these are simplified examples"
    ],
    sampleAnswer: "Calculate current month metrics in one CTE, prior month in another. Join them to compute the month-over-month change. Add Star Rating estimate based on threshold ranges.",
    explanation: "HEDIS quality measures are critical for Medicare Advantage Star Ratings, which directly impact plan revenue. This query tracks operational performance toward quality targets and estimates star rating achievement.",
    followUp: "How would you drill down to show closure rates by region or care management program?",
    timeLimit: 480
  },

  // SQL 6 - Medium: Prior Authorization Turnaround
  {
    id: 306,
    question: "SQL: Prior Authorization Metrics - Analyze prior authorization turnaround times and approval rates by service category. Return service_category, total_requests, approved_count, denied_count, avg_turnaround_hours, and pct_within_24hrs. Tables: prior_auths(auth_id, member_id, service_category, request_datetime, decision_datetime, decision) where decision is 'approved', 'denied', or 'pending'",
    category: "SQL",
    difficulty: "Medium",
    company: "Healthcare Company",
    isCoding: true,
    language: "sql",
    starterCode: `-- Analyze prior authorization turnaround and approval rates
-- Calculate average turnaround time in hours
-- Calculate % completed within 24 hours
SELECT
  -- your columns
FROM prior_auths
-- your aggregation logic
`,
    solutionCode: `SELECT 
  service_category,
  COUNT(*) AS total_requests,
  SUM(CASE WHEN decision = 'approved' THEN 1 ELSE 0 END) AS approved_count,
  SUM(CASE WHEN decision = 'denied' THEN 1 ELSE 0 END) AS denied_count,
  ROUND(AVG(
    TIMESTAMPDIFF(HOUR, request_datetime, decision_datetime)
  ), 1) AS avg_turnaround_hours,
  ROUND(
    SUM(CASE 
      WHEN TIMESTAMPDIFF(HOUR, request_datetime, decision_datetime) <= 24 THEN 1 
      ELSE 0 
    END) * 100.0 / COUNT(*), 
    1
  ) AS pct_within_24hrs
FROM prior_auths
WHERE decision IN ('approved', 'denied')  -- Exclude pending
GROUP BY service_category
ORDER BY avg_turnaround_hours DESC;`,
    testCases: [
      { input: "Turnaround calculation", expectedOutput: "Uses TIMESTAMPDIFF for hours", description: "Calculates turnaround in hours" },
      { input: "24-hour threshold", expectedOutput: "Conditional sum for <= 24 hours", description: "Counts requests within 24 hours" },
      { input: "Decision filtering", expectedOutput: "Excludes pending requests", description: "Only includes completed requests" }
    ],
    tips: [
      "TIMESTAMPDIFF(HOUR, start, end) calculates hours between timestamps",
      "Exclude 'pending' requests since they don't have decision times",
      "CASE WHEN inside SUM counts conditional occurrences",
      "Regulatory requirements often mandate 24-72 hour turnaround"
    ],
    sampleAnswer: "Use TIMESTAMPDIFF to calculate hours between request and decision. Use conditional CASE statements to count approvals, denials, and requests completed within 24 hours.",
    explanation: "Prior authorization turnaround is regulated by state and federal requirements. Urgent requests typically require 24-hour decisions. This query helps identify bottlenecks by service category.",
    followUp: "How would you identify the longest pending requests that need escalation?",
    timeLimit: 360
  },

  // SQL 7 - Hard: Risk Adjustment Factor Analysis
  {
    id: 307,
    question: "SQL: Risk Adjustment Factor (RAF) Analysis - Calculate the average RAF score by member cohort and identify members with potential RAF score increases based on suspected conditions. Return cohort, avg_current_raf, avg_potential_raf, raf_gap, and member_count. Tables: members(member_id, member_name, age_band, region), raf_scores(member_id, current_raf, condition_code), suspected_conditions(member_id, suspected_code, confidence_score) - only include suspected conditions with confidence >= 0.7",
    category: "SQL",
    difficulty: "Hard",
    company: "Healthcare Company",
    isCoding: true,
    language: "sql",
    starterCode: `-- Analyze RAF (Risk Adjustment Factor) scores and potential gaps
-- Current RAF from documented conditions
-- Potential RAF includes high-confidence suspected conditions
-- confidence_score >= 0.7 for suspected conditions
SELECT
  -- cohort analysis with RAF gaps
FROM members m
-- your RAF analysis logic
`,
    solutionCode: `WITH member_raf AS (
  SELECT 
    m.member_id,
    m.age_band,
    m.region,
    COALESCE(MAX(r.current_raf), 1.0) AS current_raf
  FROM members m
  LEFT JOIN raf_scores r ON m.member_id = r.member_id
  GROUP BY m.member_id, m.age_band, m.region
),
suspected_raf_boost AS (
  SELECT 
    member_id,
    SUM(0.15) AS potential_raf_increase  -- Simplified: each suspected condition adds 0.15
  FROM suspected_conditions
  WHERE confidence_score >= 0.7
  GROUP BY member_id
),
member_with_potential AS (
  SELECT 
    mr.member_id,
    mr.age_band AS cohort,
    mr.current_raf,
    mr.current_raf + COALESCE(srb.potential_raf_increase, 0) AS potential_raf
  FROM member_raf mr
  LEFT JOIN suspected_raf_boost srb ON mr.member_id = srb.member_id
)
SELECT 
  cohort,
  ROUND(AVG(current_raf), 3) AS avg_current_raf,
  ROUND(AVG(potential_raf), 3) AS avg_potential_raf,
  ROUND(AVG(potential_raf) - AVG(current_raf), 3) AS raf_gap,
  COUNT(*) AS member_count,
  ROUND(AVG(potential_raf - current_raf) * 1000, 0) AS revenue_opportunity_per_member
FROM member_with_potential
GROUP BY cohort
HAVING AVG(potential_raf) > AVG(current_raf)
ORDER BY raf_gap DESC;`,
    testCases: [
      { input: "RAF gap calculation", expectedOutput: "potential_raf - current_raf", description: "Calculates RAF gap correctly" },
      { input: "Confidence filter", expectedOutput: "confidence_score >= 0.7", description: "Filters high-confidence suspected conditions" },
      { input: "Cohort grouping", expectedOutput: "GROUP BY cohort (age_band)", description: "Groups by member cohort" }
    ],
    tips: [
      "RAF (Risk Adjustment Factor) determines Medicare Advantage payments",
      "Higher RAF = higher payments to cover sicker members",
      "Suspected conditions represent documentation improvement opportunities",
      "COALESCE handles members with no conditions (RAF = 1.0 baseline)"
    ],
    sampleAnswer: "Calculate current RAF per member. Add potential RAF increase from high-confidence suspected conditions. Aggregate by cohort (age band) to show average gaps and revenue opportunity.",
    explanation: "Risk adjustment is critical for Medicare Advantage plan revenue. This query identifies documentation improvement opportunities where members likely have conditions that aren't yet coded. The confidence score filters ML-predicted conditions.",
    followUp: "How would you prioritize which members to target for chart reviews?",
    timeLimit: 480
  },

  // ===== ANALYTICS QUESTIONS =====

  // Analytics 1 - Easy
  {
    id: 401,
    question: "You're given data showing that member satisfaction scores dropped 15% last quarter. What steps would you take to analyze this issue and identify root causes?",
    category: "Analytics",
    difficulty: "Easy",
    company: "Healthcare Company",
    tips: [
      "Start with segmentation to narrow down the problem",
      "Look for correlation with operational changes",
      "Consider both quantitative and qualitative data sources"
    ],
    sampleAnswer: "1) Segment the data: by demographics, plan type, region, and touchpoint type, 2) Identify which segments had the largest drops, 3) Correlate with operational changes: staffing, wait times, policy changes, 4) Analyze survey verbatims and call center notes for themes, 5) Compare against industry benchmarks, 6) Build hypotheses and validate with additional data.",
    followUp: "How would you prioritize which root cause to address first?",
    timeLimit: 180
  },

  // Analytics 2 - Medium
  {
    id: 402,
    question: "Design an analytics dashboard to monitor key performance indicators for a Medicare Advantage health plan. What metrics would you include and how would you structure it?",
    category: "Analytics",
    difficulty: "Medium",
    company: "Healthcare Company",
    tips: [
      "Consider CMS Star Ratings measures",
      "Include both leading and lagging indicators",
      "Think about different stakeholder needs"
    ],
    sampleAnswer: "I'd structure with: 1) Executive Summary: overall Star Rating, membership growth, MLR, 2) Clinical Quality: HEDIS measures, medication adherence, preventive care rates, 3) Member Experience: CAHPS scores, complaint rates, call center metrics, 4) Operations: claims processing time, prior auth turnaround, 5) Financial: PMPM costs, risk adjustment accuracy, 6) Drill-down capability by region, plan, and time period.",
    followUp: "How would you handle real-time vs batch data updates for different metrics?",
    timeLimit: 300
  },

  // Analytics 3 - Medium
  {
    id: 403,
    question: "You notice that 20% of members are responsible for 80% of claims costs. How would you analyze this high-cost member population and what insights would you look for?",
    category: "Analytics",
    difficulty: "Medium",
    company: "Healthcare Company",
    tips: [
      "This is common in healthcare - Pareto principle",
      "Look for preventable vs non-preventable costs",
      "Consider care management intervention opportunities"
    ],
    sampleAnswer: "Analysis approach: 1) Profile the cohort: demographics, chronic conditions, social determinants, 2) Categorize cost drivers: ER utilization, inpatient stays, specialty drugs, 3) Identify avoidable costs: preventable admissions, ER for non-emergencies, 4) Look for care gaps: missing preventive care, medication non-adherence, 5) Assess care management enrollment, 6) Model intervention ROI: which members would benefit most from outreach?",
    followUp: "How would you measure the effectiveness of a care management program for this population?",
    timeLimit: 240
  },

  // Analytics 4 - Hard
  {
    id: 404,
    question: "Design an A/B testing framework to evaluate whether a new digital health coaching app improves member outcomes. What metrics would you track, how would you structure the test, and what pitfalls would you avoid?",
    category: "Analytics",
    difficulty: "Hard",
    company: "Healthcare Company",
    tips: [
      "Consider sample size and statistical power",
      "Healthcare A/B tests have unique challenges",
      "Think about ethical considerations and consent"
    ],
    sampleAnswer: "Framework: 1) Primary metrics: clinical outcomes (A1c, BP), engagement, cost, 2) Sample size: calculate for 80% power to detect meaningful clinical difference, 3) Randomization: stratify by risk level and demographics, 4) Duration: minimum 6 months for clinical outcomes, 5) Pitfalls to avoid: contamination between groups, Hawthorne effect, selection bias from opt-in, 6) Ethics: ensure control group still gets standard care, 7) Analysis: intent-to-treat plus per-protocol.",
    followUp: "How would you handle members who drop out of the study?",
    timeLimit: 360
  },

  // Analytics 5 - Hard
  {
    id: 405,
    question: "Build a predictive model to identify members at high risk of hospital readmission within 30 days. What features would you include, what modeling approaches would you consider, and how would you validate and deploy the model?",
    category: "Analytics",
    difficulty: "Hard",
    company: "Healthcare Company",
    tips: [
      "This is a well-studied problem in healthcare",
      "Consider both clinical and social determinants",
      "Model interpretability matters for clinical adoption"
    ],
    sampleAnswer: "Features: demographics, diagnosis codes (HCC), prior admissions, length of stay, discharge disposition, medication count, social determinants, PCP engagement. Models: logistic regression (interpretable), gradient boosting (accuracy), or calibrated ensemble. Validation: time-based train/test split, AUC-ROC, precision-recall, calibration plots. Deployment: integrate into discharge workflow, provide risk scores + key drivers to care managers, monitor for drift, establish feedback loop.",
    followUp: "How would you address potential bias in the model against certain demographic groups?",
    timeLimit: 420
  },

  // Analytics 6 - Medium (Healthcare-specific coding)
  {
    id: 406,
    question: "Analytics Coding: Given member engagement data, write a function to calculate the engagement score. Members earn points for: completing health assessment (20 pts), annual wellness visit (30 pts), each preventive screening (15 pts), gym check-ins (2 pts each, max 50 pts). Return total score capped at 150.",
    category: "Analytics",
    difficulty: "Medium",
    company: "Healthcare Company",
    isCoding: true,
    language: "javascript",
    starterCode: `function calculateEngagementScore(memberData) {
  // memberData = {
  //   healthAssessmentCompleted: boolean,
  //   wellnessVisitCompleted: boolean,
  //   preventiveScreenings: number,
  //   gymCheckIns: number
  // }
  // Return total score (max 150)
  
}`,
    solutionCode: `function calculateEngagementScore(memberData) {
  let score = 0;
  
  // Health assessment: 20 points
  if (memberData.healthAssessmentCompleted) {
    score += 20;
  }
  
  // Wellness visit: 30 points
  if (memberData.wellnessVisitCompleted) {
    score += 30;
  }
  
  // Preventive screenings: 15 points each
  score += memberData.preventiveScreenings * 15;
  
  // Gym check-ins: 2 points each, max 50
  const gymPoints = Math.min(memberData.gymCheckIns * 2, 50);
  score += gymPoints;
  
  // Cap total at 150
  return Math.min(score, 150);
}`,
    testCases: [
      { input: "calculateEngagementScore({ healthAssessmentCompleted: true, wellnessVisitCompleted: true, preventiveScreenings: 2, gymCheckIns: 10 })", expectedOutput: "100", description: "All activities completed moderately" },
      { input: "calculateEngagementScore({ healthAssessmentCompleted: false, wellnessVisitCompleted: false, preventiveScreenings: 0, gymCheckIns: 0 })", expectedOutput: "0", description: "No engagement" },
      { input: "calculateEngagementScore({ healthAssessmentCompleted: true, wellnessVisitCompleted: true, preventiveScreenings: 5, gymCheckIns: 100 })", expectedOutput: "150", description: "Max score cap applied" },
      { input: "calculateEngagementScore({ healthAssessmentCompleted: false, wellnessVisitCompleted: false, preventiveScreenings: 0, gymCheckIns: 30 })", expectedOutput: "50", description: "Gym points capped at 50" }
    ],
    tips: [
      "Apply gym check-in cap (50 pts) before adding to total",
      "Apply total cap (150 pts) at the end",
      "Use Math.min() for capping values",
      "Handle each category separately for clarity"
    ],
    sampleAnswer: "Calculate each component: assessment (20), wellness (30), screenings (15 each), gym (2 each, max 50). Sum all and cap at 150 using Math.min().",
    explanation: "This demonstrates implementing a business rules engine common in healthcare analytics. Multiple rules with caps require careful ordering - apply component caps first, then overall cap.",
    followUp: "How would you modify this to weight recent activities higher?",
    timeLimit: 300
  },

  // Analytics 7 - Hard (Healthcare analytics coding)
  {
    id: 407,
    question: "Analytics Coding: Calculate the risk stratification tier for members based on their clinical profile. Tier 1 (Low): 0-1 chronic conditions and no ER visits. Tier 2 (Medium): 2-3 chronic conditions OR 1-2 ER visits. Tier 3 (High): 4+ chronic conditions OR 3+ ER visits. Tier 4 (Critical): 4+ chronic conditions AND 3+ ER visits. Return the tier name.",
    category: "Analytics",
    difficulty: "Hard",
    company: "CleverCare Health Plan",
    isCoding: true,
    language: "javascript",
    starterCode: `function getRiskTier(memberProfile) {
  // memberProfile = {
  //   chronicConditions: number,
  //   erVisitsLastYear: number
  // }
  // Return: 'Tier 1 (Low)', 'Tier 2 (Medium)', 'Tier 3 (High)', or 'Tier 4 (Critical)'
  
}`,
    solutionCode: `function getRiskTier(memberProfile) {
  const { chronicConditions, erVisitsLastYear } = memberProfile;
  
  // Tier 4 (Critical): 4+ chronic AND 3+ ER
  if (chronicConditions >= 4 && erVisitsLastYear >= 3) {
    return 'Tier 4 (Critical)';
  }
  
  // Tier 3 (High): 4+ chronic OR 3+ ER
  if (chronicConditions >= 4 || erVisitsLastYear >= 3) {
    return 'Tier 3 (High)';
  }
  
  // Tier 2 (Medium): 2-3 chronic OR 1-2 ER
  if ((chronicConditions >= 2 && chronicConditions <= 3) || 
      (erVisitsLastYear >= 1 && erVisitsLastYear <= 2)) {
    return 'Tier 2 (Medium)';
  }
  
  // Tier 1 (Low): 0-1 chronic AND no ER visits
  return 'Tier 1 (Low)';
}`,
    testCases: [
      { input: "getRiskTier({ chronicConditions: 0, erVisitsLastYear: 0 })", expectedOutput: '"Tier 1 (Low)"', description: "Healthy member - lowest tier" },
      { input: "getRiskTier({ chronicConditions: 2, erVisitsLastYear: 0 })", expectedOutput: '"Tier 2 (Medium)"', description: "2 chronic conditions - medium tier" },
      { input: "getRiskTier({ chronicConditions: 5, erVisitsLastYear: 1 })", expectedOutput: '"Tier 3 (High)"', description: "High chronic but low ER - high tier" },
      { input: "getRiskTier({ chronicConditions: 4, erVisitsLastYear: 3 })", expectedOutput: '"Tier 4 (Critical)"', description: "Both thresholds met - critical tier" },
      { input: "getRiskTier({ chronicConditions: 1, erVisitsLastYear: 2 })", expectedOutput: '"Tier 2 (Medium)"', description: "ER visits trigger medium tier" }
    ],
    tips: [
      "Check most severe tier first (Tier 4) due to AND condition",
      "Order of checking matters - check more specific conditions first",
      "Tier 4 uses AND, Tier 3 uses OR",
      "Tier 1 is the default if no other conditions match"
    ],
    sampleAnswer: "Check tiers from highest to lowest. Tier 4 requires BOTH conditions (AND). Tier 3 requires EITHER condition (OR). Tier 2 has range conditions. Default to Tier 1.",
    explanation: "Risk stratification is fundamental to population health management. The logic order matters: check the most specific combined condition (Tier 4) first, then less restrictive conditions. This ensures proper classification.",
    followUp: "How would you extend this to include social determinants of health factors?",
    timeLimit: 360
  }
];
