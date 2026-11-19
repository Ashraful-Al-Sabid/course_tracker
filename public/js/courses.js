export const COURSES = [
  {
    id: "cse3522",
    code: "CSE 3522",
    title: "Database Management Systems Laboratory",
    term: "Fall 2026",
    section: "Section C, E",
    instructor: "Md. Golam Hossain",
    unit: "Lab",
    classes: [
      {
        title: "Introduction to relational databases and basic DDL",
        co: "CO2",
        items: [
          "Relational model: tables, rows, columns and keys",
          "Setting up the DBMS working environment",
          "CREATE DATABASE and CREATE TABLE",
          "Choosing data types for columns",
          "Basic constraints: PRIMARY KEY, NOT NULL, UNIQUE"
        ]
      },
      {
        title: "Advanced DDL: security, validation and integrity",
        co: "CO2",
        items: [
          "ALTER TABLE: add, modify and drop columns",
          "FOREIGN KEY and referential integrity",
          "ON DELETE and ON UPDATE actions",
          "CHECK and DEFAULT constraints for validation",
          "DROP and TRUNCATE"
        ]
      },
      {
        title: "DML operations: SELECT, filtering, aggregation, grouping, sorting and set operations",
        co: "CO1",
        items: [
          "INSERT, UPDATE and DELETE",
          "SELECT with WHERE filtering",
          "Aggregate functions: COUNT, SUM, AVG, MIN, MAX",
          "GROUP BY",
          "HAVING to filter grouped results",
          "ORDER BY to sort output",
          "Set operations: UNION, INTERSECT, EXCEPT",
          { text: "Lab Test 1", kind: "Test" }
        ]
      },
      {
        title: "Intermediate DML: string processing, subqueries and joins",
        co: "CO1",
        items: [
          "String functions and pattern matching with LIKE",
          "Subqueries in WHERE: IN, ANY, ALL, EXISTS",
          "Subqueries in FROM and SELECT",
          "INNER JOIN across tables",
          "Outer joins: LEFT, RIGHT and FULL"
        ]
      },
      {
        title: "Advanced subqueries and joins, and starting a database project",
        co: "CO1",
        items: [
          "Correlated subqueries",
          "Multi-table joins and self joins",
          "Aggregation and subqueries over joined tables",
          "Database project setup with a database server and web server",
          { text: "Lab Test 2", kind: "Test" }
        ]
      },
      {
        title: "Mid-term exam",
        co: "CO1, CO2",
        items: [{ text: "Mid-term exam: DDL, constraints, DML, subqueries, set operations and joins", kind: "Exam" }]
      },
      {
        title: "Views and authorization",
        co: "CO2",
        items: [
          "CREATE VIEW to simplify complex queries",
          "Updatable and non-updatable views",
          "Users and privileges",
          "GRANT and REVOKE"
        ]
      },
      {
        title: "Triggers in SQL",
        co: "CO2",
        items: [
          "Trigger syntax and when triggers fire",
          "BEFORE and AFTER triggers",
          "Row-level and statement-level triggers",
          "Triggers for data validation and business rules",
          "Audit logging with triggers"
        ]
      },
      {
        title: "Query optimization and indexing",
        co: "CO2",
        items: [
          "Creating and managing indexes",
          "Indexing strategies: B-tree and bitmap indexes",
          "How indexes change query performance",
          "Reading query execution plans",
          { text: "Lab Test 3", kind: "Test" }
        ]
      },
      {
        title: "Mini project progress assessment",
        co: "CO3, CO4",
        items: [{ text: "Demonstrate mini project development progress", kind: "Project" }]
      },
      {
        title: "Final exam",
        co: "CO2",
        items: [{ text: "Final exam: all database concepts and SQL skills from the course", kind: "Exam" }]
      },
      {
        title: "Mini project presentation and report",
        co: "CO3, CO4",
        items: [
          { text: "Mini project presentation and viva", kind: "Project" },
          { text: "Submit the project report", kind: "Project" }
        ]
      }
    ]
  },
  {
    id: "cse3521",
    code: "CSE 3521",
    title: "Database Management Systems",
    term: "Fall 2026",
    section: "Section H",
    instructor: "Md. Shafqat Talukder Rakin",
    unit: "Class",
    classes: [
      { title: "Introduction to databases and data models", items: [
        "What a database and a relational database are",
        "Why database management systems are needed",
        "Different data models",
        "Administration of a database"
      ] },
      { title: "Relational algebra: basic operations", items: ["Relational algebra: basic operations"] },
      { title: "Relational algebra: complex operations", items: ["Relational algebra: complex operations"] },
      { title: "Relational database: security and integrity management", items: [
        "Security management",
        "Integrity management"
      ] },
      { title: "Schema models, definition and manipulation languages", items: [
        "Schema models",
        "Data definition language",
        "Data manipulation language"
      ] },
      { title: "Relational database: constraints, attributes and manipulations", items: [
        "Constraints",
        "Attributes",
        "Manipulations"
      ] },
      { title: "Relational database: simple queries", items: ["Simple query details"] },
      { title: "Relational database: complex queries", items: ["Complex query details"] },
      { title: "Relational database: views", items: ["View concepts"] },
      { title: "Entity relationship model: attributes and constraints", items: [
        "ER model attributes",
        "ER model constraints"
      ] },
      { title: "Entity relationship model: case study", items: ["Designing a database from a case study with the ER model"] },
      { title: "Review of mid-term syllabus", items: ["Review of mid-term syllabus"] },
      { label: "Mid", title: "Mid-term exam", items: [{ text: "Mid-term exam", kind: "Exam" }] },
      { title: "Functional dependencies", items: [
        "Functional dependencies",
        "Impact of functional dependencies"
      ] },
      { title: "Anomalies and normalization", items: [
        "Anomaly problems",
        "Normalization",
        "Different normal forms"
      ] },
      { title: "Normalizing with functional dependencies", items: ["Applying functional dependencies to normalize a database into different normal forms"] },
      { title: "Normalization in real-life database design", items: ["Applying normalization to design databases for real-life problems"] },
      { title: "Indexing and hashing: introduction", items: [
        "Why indexing and hashing matter",
        "Types of indexing and hashing",
        "Applications"
      ] },
      { title: "Indexing: B+ tree", items: [
        "B+ tree structure",
        "Manipulating a B+ tree"
      ] },
      { title: "Hashing: dynamic hash structure", items: [
        "Dynamic hash structure",
        "Manipulating a dynamic hash structure"
      ] },
      { title: "Transactions: definition and states", items: [
        "Definition and importance of transactions",
        "Transaction characteristics",
        "Transaction states"
      ] },
      { title: "Transactions: consistency and serializability", items: [
        "Consistency",
        "Serializability"
      ] },
      { title: "Transactions: atomicity, backup and RAID", items: [
        "Atomicity",
        "Backup system",
        "RAID levels"
      ] },
      { title: "File storage management", items: ["File storage management"] },
      { title: "Review of final syllabus", items: ["Review of final syllabus"] },
      { label: "Final", title: "Final exam", items: [{ text: "Final exam", kind: "Exam" }] }
    ]
  },
  {
    id: "cse4165",
    code: "CSE 4165",
    title: "Web Programming",
    instructor: "Mahmudul Hasan",
    unit: "Class",
    classes: [
      { title: "HTML: structure and basic tags", items: [
        "HTML document structure and tags",
        "Headings",
        "Links",
        "Images",
        "Lists"
      ] },
      { title: "HTML: forms, tables and semantic tags", items: [
        "Forms and inputs",
        "Tables",
        "Semantic tags",
        "Media"
      ] },
      { title: "CSS: selectors, box model and styling basics", items: [
        "Selectors",
        "Box model",
        "Colors",
        "Fonts",
        "Units"
      ] },
      { title: "CSS: layout and responsive design", items: [
        "Flexbox",
        "Grid",
        "Responsive design",
        "Bootstrap"
      ] },
      { title: "JavaScript: language basics", items: [
        "Variables and data types",
        "Functions",
        "Arrays",
        "Strings"
      ] },
      { title: "JavaScript: DOM, events, objects and JSON", items: [
        "DOM",
        "Events",
        "Objects",
        "JSON"
      ] },
      { label: "Mid", title: "Mid-term examination", items: [{ text: "Mid-term examination", kind: "Exam" }] },
      { title: "Python basics", items: ["Python basics"] },
      { title: "Python: classes, libraries, tuples and dictionaries", items: [
        "Classes",
        "Libraries",
        "Tuples",
        "Dictionaries"
      ] },
      { title: "Django basics and database integration", items: [
        "Django basics",
        "Database integration",
        "SQL and ORMs"
      ] },
      { title: "Django forms and CRUD", items: [
        "Django forms and validation",
        "CRUD",
        "CSRF protection",
        "Form integration"
      ] },
      { title: "Django permissions and deployment", items: [
        "Django permissions",
        "Deployment"
      ] },
      { title: "Project evaluation and term final discussion", items: [
        { text: "Project evaluation", kind: "Project" },
        "Term final discussion"
      ] },
      { label: "Final", title: "Final examination", items: [{ text: "Final examination", kind: "Exam" }] }
    ]
  },
  {
    id: "eee2123",
    code: "EEE 2123",
    title: "Electronics",
    term: "Fall 2026",
    unit: "Class",
    classes: [
      { title: "Semiconductor diodes 1", items: [
        "Semiconductor materials and physics",
        "P-N junction",
        "Ideal diode"
      ] },
      { title: "Semiconductor diodes 2", items: [
        "P-N junction",
        "Diode I-V curve"
      ] },
      { title: "Semiconductor diodes 3", items: [
        "Temperature dependence of the I-V curve",
        "Zener diodes"
      ] },
      { title: "Zener diodes and diode applications 1", items: [
        "Zener diodes",
        "Diode configurations with DC inputs"
      ] },
      { title: "Diode applications 2 and 3", items: [
        "Diode configurations with DC inputs",
        "Clippers"
      ] },
      { title: "Diode applications 4", items: [
        "Clippers",
        { text: "Class Test 1", kind: "Test" }
      ] },
      { title: "Diode applications 5", items: ["Clampers"] },
      { title: "Diode applications 6", items: [
        "Sinusoidal inputs",
        "Half-wave rectification",
        "Full-wave rectification"
      ] },
      { title: "Bipolar junction transistors: history and construction", items: [
        "History of transistors",
        "BJT construction",
        { text: "Class Test 2", kind: "Test" }
      ] },
      { title: "Bipolar junction transistors: history and construction (continued)", items: ["History of transistors and BJT construction, continued"] },
      { title: "Bipolar junction transistors: modes of operation", items: [
        "Modes of operation",
        "PNP transistor",
        { text: "Class Test 3", kind: "Test" }
      ] },
      { title: "Bipolar junction transistors: characteristics", items: [
        "Current-voltage characteristics",
        "Common-base characteristics",
        { text: "Take-home assignment from chapter exercises", kind: "Assignment" }
      ] },
      { label: "Mid", title: "Mid-term exam (5 to 12 Dec 2026)", items: [{ text: "Mid-term exam", kind: "Exam" }] },
      { title: "MOSFET 1A: structure and operation", items: [
        "Device structure and operation",
        "History of the MOSFET"
      ] },
      { title: "MOSFET 1A: characteristics and types", items: [
        "Current-voltage characteristics",
        "MOSFET types"
      ] },
      { title: "MOSFET 2A: current-voltage characteristics", items: ["MOSFET current-voltage characteristics"] },
      { title: "MOSFET 2A: circuits at DC", items: ["MOSFET circuits at DC"] },
      { title: "MOSFET: amplifier operation", items: ["Amplifier operation"] },
      { title: "MOSFET: small-signal operation and models", items: [
        "Small-signal operation",
        "Small-signal models"
      ] },
      { title: "MOSFET: CMOS logic design", items: [
        "CMOS logic design",
        { text: "Class Test 4", kind: "Test" }
      ] },
      { title: "CMOS implementation of logic gates", items: ["CMOS implementation of logic gates"] },
      { title: "CMOS implementation of logic gates (continued)", items: ["CMOS implementation of logic gates, continued"] },
      { title: "Operational amplifiers: ideal op-amp and basic amplifiers", items: [
        "Ideal op-amp",
        "Inverting amplifier",
        "Non-inverting amplifier",
        { text: "Class Test 5", kind: "Test" },
        { text: "Take-home assignment from chapter exercises", kind: "Assignment" }
      ] },
      { title: "Operational amplifiers: summing and difference", items: [
        "Summing amplifier",
        "Difference amplifier"
      ] },
      { title: "Operational amplifiers: integrator, differentiator and logarithmic", items: [
        "Integrator",
        "Differentiator",
        "Logarithmic amplifier"
      ] }
    ]
  },
  {
    id: "eee2124",
    code: "EEE 2124",
    title: "Electronics Laboratory",
    instructor: "Imran Hossain",
    unit: "Class",
    classes: [
      { title: "Introduction", items: ["Introduction to the lab"] },
      { title: "Lab 1: Circuits, meters and measurements", items: [
        "Building circuits on a breadboard",
        "Using meters",
        "Taking measurements",
        { text: "Lab 1 report", kind: "Report" }
      ] },
      { title: "Lab 2: Diode I-V characteristics with Multisim", items: [
        "Diode I-V characteristics",
        "Simulating the circuit in Multisim",
        { text: "Lab 2 report", kind: "Report" }
      ] },
      { title: "Lab 3: Diode rectifier circuits", items: [
        "Diode rectifier circuits",
        { text: "Lab 3 report", kind: "Report" }
      ] },
      { title: "Lab 4: Diode clipping and clamping circuits", items: [
        "Clipping circuits",
        "Clamping circuits",
        { text: "Lab 4 report", kind: "Report" }
      ] },
      { title: "Mid-term assessment", items: [{ text: "Mid-term assessment", kind: "Exam" }] },
      { title: "Arduino workshop", items: ["Arduino workshop"] },
      { title: "Final exam", items: [{ text: "Final exam: circuit implementation using Multisim", kind: "Exam" }] },
      { title: "Workshop on LaTeX", items: ["Workshop on LaTeX"] },
      { title: "Project update", items: [{ text: "Project update 1: hardware implementation", kind: "Project" }] },
      { title: "Project update", items: [{ text: "Project update 2: hardware implementation", kind: "Project" }] },
      { title: "Project showcase", items: [{ text: "Project showcase", kind: "Project" }] }
    ]
  }
];
