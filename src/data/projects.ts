export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  images?: string[];
  githubUrl?: string;
  demoUrl?: string;
  contribution?: string;
}

export const projectsData: Project[] = [
  {
    id: "smartholder",
    title: "SmartHolder",
    images: [
      "/projects/Smart_holder_1.png",
      "/projects/Smart_holder_2.png",
      "/projects/Smart_holder_3.jpeg"
    ],
    description: "ESP8266-based smart bulb holder with MQTT control, self-contained web dashboard, and QR-code pairing.Developed for Tharushan's Team with Pasindu Dayarathna",
    longDescription: "A fully self-contained smart bulb holder featuring servo-controlled shade walls, a mosquito repeller, and NTP scheduling. Users can pair via QR-code and control it through a built-in web server or MQTT.",
    tags: ["Solid Works CAD","ESP8266", "MQTT", "Embedded Web Server", "C++"],
    githubUrl: "https://oshanharischandra.github.io/#"
  },
  {
    id: "prefect-attendance",
    title: "Prefect Room Attendance System",
    images: [
      "/projects/PP_1.png",
      "/projects/PP_2.jpeg",
      "/projects/PP_3.jpeg"
    ],
    description: "RFID attendance logger with SD card CSV logging, RTC, and GSM alerts for Sri Gnanodaya National School Divulapitiya.",
    longDescription: "An ESP32-based attendance system using an MFRC522 RFID reader. It logs data locally to an SD card (CSV), uses a DS3231 RTC for timestamps, sends SMS alerts via SIM800L, and syncs to a web dashboard.This is a group project and my collabarators are Bajithan Sivathasa , Charith Fonseka",
    tags: ["ESP32", "RFID", "SIM800L", "C++", "Web Dashboard"],
    githubUrl: "https://oshanharischandra.github.io/#"
  },

  {
    id: "stm32-maze",
    title: "STM32 Maze-Solving Robot (in progress)",
    images: [
      "/projects/maze_stm_1.png"
    ],
    description: "Autonomous robot built for Robofest 2026, featuring dual-loop PID and flood-fill navigation.(in progress)",
    longDescription: "Developing using PlatformIO, this robot uses N20 motors, an MPU-9250 gyro, and VL53L0X ToF sensors. The navigation relies on dual-loop PID for wall-centering and heading, combined with a flood-fill BFS algorithm.",
    tags: ["Solid Works CAD","PCB with KICAD","STM32", "PlatformIO", "PID Control", "C/C++", "Robotics"],
    githubUrl: "https://oshanharischandra.github.io/#"
  },
{
  id: "medimate",
  title: "Medi-Mate",
  images: [
    "/projects/MM_1.png",
    "/projects/MM_2.jpeg",
    "/projects/MM_3.jpg",
    "/projects/MM_4.jpg"
  ],
  description: "Smart medicine dispenser hardware developed for Team Zentix. Collaborated with Pasindu Dayarathne to exclusively design and build the physical prototype, contributing to the team's Overall Championship at INCO 2026.",
  longDescription: "Medi-Mate is an automated multi-medication dispenser designed to improve medication management via timely reminders, automated dispensing, and caregiver alerts. Collaborated with Pasindu Dulsara to engineer the complete hardware architecture for Team Zentix. The physical build utilizes SolidWorks CAD modeling, NEMA17 steppers, and A4988 drivers with trapezoidal velocity ramping to prevent mechanical overshoot. Integrated with a web dashboard, the system reliably alerts users via SMS (GSM) and MQTT. Our hardware solution helped the team secure the Overall Championship—including 1st Place in Marketing and 2nd Place in Innovation—at the INCO 2026 exhibition.",
  tags: ["SolidWorks CAD", "Hardware Design", "Arduino", "Stepper Motors", "MQTT", "GSM", "IoT"],
  githubUrl: "https://www.linkedin.com/posts/oshan-harischandra-354792351_inco-inco2026-mit-activity-7493216594375135235-jrrz?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFfbzHAB8wjNBJmOWq2cxOCDOHSHGn8Y4JI"
},

{
  id: "Hydro-Habit",
  title: "Hydro-Habit",
  images: [
    "/projects/HH_1.png",
    "/projects/HH_2.jpeg"
  ],
  description: "A smart prototype solution designed to encourage better hydration habits, awarded 2nd Runner-Up at INCO 2026.",
  longDescription: "An award-winning smart hydration system developed for the INCO 2026 exhibition. My core contributions to the project included 3D designing the hardware models and debugging the IoT systems to ensure a reliable, functional prototype.",
  tags: ["IoT", "3D Modeling", "Prototyping", "Smart Technology"],
  githubUrl: "https://www.linkedin.com/posts/oshan-harischandra-354792351_inco2026-hydrohabit-universityofkelaniya-activity-7494725551195226112-XdJW?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFfbzHAB8wjNBJmOWq2cxOCDOHSHGn8Y4JI"
}


];
