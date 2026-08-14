export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  thumbnail?: string;
  githubUrl?: string;
  demoUrl?: string;
  contribution?: string;
}

export const projectsData: Project[] = [
  {
    id: "smartholder",
    title: "SmartHolder",
    description: "ESP8266-based smart bulb holder with MQTT control, self-contained web dashboard, and QR-code pairing.",
    longDescription: "A fully self-contained smart bulb holder featuring servo-controlled shade walls, a mosquito repeller, and NTP scheduling. Users can pair via QR-code and control it through a built-in web server or MQTT.",
    tags: ["ESP8266", "MQTT", "Embedded Web Server", "C++"],
    githubUrl: "https://github.com/username/smartholder"
  },
  {
    id: "prefect-attendance",
    title: "Prefect Room Attendance System",
    description: "RFID attendance logger with SD card CSV logging, RTC, and GSM alerts.",
    longDescription: "An ESP32-based attendance system using an MFRC522 RFID reader. It logs data locally to an SD card (CSV), uses a DS3231 RTC for timestamps, sends SMS alerts via SIM800L, and syncs to a web dashboard.",
    tags: ["ESP32", "RFID", "SIM800L", "C++", "Web Dashboard"],
    githubUrl: "https://github.com/username/prefect-attendance"
  },
  {
    id: "safex-wearable",
    title: "SafeX Wearable Health Monitor",
    description: "Health monitoring wearable built for iDEASPRiNT hackathon using XIAO ESP32S3 Sense.",
    contribution: "Hardware Lead: component selection, GPIO planning, wiring, and power/battery estimation.",
    tags: ["XIAO ESP32S3", "Wearable", "Sensors", "Hardware Design"],
    githubUrl: "https://github.com/username/safex-wearable"
  },
  {
    id: "stm32-maze",
    title: "STM32 Maze-Solving Robot",
    description: "Autonomous robot built for Robofest, featuring dual-loop PID and flood-fill navigation.",
    longDescription: "Developed using PlatformIO, this robot uses N20 motors, an MPU-9250 gyro, and VL53L0X ToF sensors. The navigation relies on dual-loop PID for wall-centering and heading, combined with a flood-fill BFS algorithm.",
    tags: ["STM32", "PlatformIO", "PID Control", "C/C++", "Robotics"],
    githubUrl: "https://github.com/username/stm32-maze"
  },
  {
    id: "medimate",
    title: "Medi-Mate",
    description: "Automated multi-medication dispenser with stepper motors and GSM alerting.",
    longDescription: "Uses NEMA17 steppers and A4988 drivers with trapezoidal velocity ramping to fix overshoot. Configurable via a web dashboard, it alerts users via SMS (GSM) and MQTT.",
    tags: ["Arduino", "Stepper Motors", "MQTT", "GSM", "Web Dashboard"],
    githubUrl: "https://github.com/username/medimate"
  },
  {
    id: "aeroponics",
    title: "Aeroponics Control System",
    description: "Arduino-based grow environment controller with a LAN web dashboard.",
    longDescription: "Features sine-eased PWM fan control, a mode-cycling humidifier, and an I2C LCD for local monitoring. Accessible via a LAN dashboard.",
    tags: ["Arduino", "PWM", "I2C", "LAN", "Control Systems"],
    githubUrl: "https://github.com/username/aeroponics"
  },
  {
    id: "water-management",
    title: "Water Management IoT System",
    description: "Industrial-grade water level monitoring for a tea factory (in progress).",
    longDescription: "Monitors 4 tanks with a dashboard and abnormal-condition alerts. Built to industrial standards for reliability in a factory environment.",
    tags: ["IoT", "Industrial", "Sensors", "Dashboard"],
    githubUrl: "https://github.com/username/water-management"
  },
  {
    id: "unimart",
    title: "UniMart",
    description: "Campus marketplace full-stack web app built for a Software Architecture course.",
    tags: ["React", "TypeScript", "Redux Toolkit", "MUI", "Tailwind CSS"],
    githubUrl: "https://github.com/username/unimart",
    demoUrl: "https://unimart-demo.com"
  },
  {
    id: "nextask",
    title: "nexTask",
    description: "Group task-management web app.",
    contribution: "Full DB design (11 tables, Prisma schema, PlantUML ER diagram) and backend architecture documentation.",
    tags: ["PostgreSQL", "Prisma", "System Design", "UML"],
    githubUrl: "https://github.com/username/nextask"
  }
];
