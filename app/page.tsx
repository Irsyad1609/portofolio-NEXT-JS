"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, User, FileText, Mail, Terminal, Wifi, MapPin, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function DeveloperPortfolio() {
  const [isDark, setIsDark] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [userIP, setUserIP] = useState("Loading...")
  const [currentPath, setCurrentPath] = useState("/root/irsyad.eu")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Simulate getting real user IP
    const getIP = async () => {
      try {
        // In a real implementation, you'd use a service like ipapi.co or ipify.org
        // For demo purposes, we'll simulate different IPs
        const simulatedIPs = ["203.142.67.45", "114.79.32.108", "180.241.155.23", "36.67.89.142"]
        const randomIP = simulatedIPs[Math.floor(Math.random() * simulatedIPs.length)]
        setTimeout(() => setUserIP(randomIP), 1000)
      } catch (error) {
        setUserIP("192.168.1.100")
      }
    }
    getIP()
  }, [])

  useEffect(() => {
    // Simulate initial terminal commands
    const initialCommands = [
      "$ whoami",
      "IRSYAD KHOIRUL ANWAR",
      "Network Engineer",
      "",
      "$ cat about.txt",
      "I'm a Network Engineer experienced in various projects. I specialize in designing,",
      "deploying, and managing network infrastructures, from enterprise WAN and data center network",
      "to service provider routing, as well as wired and wireless LAN environments. ",
      "...",
      "I have in-depth expertise in both IPv4 and IPv6,",
      "and extensive knowledge of service provider technologies, including BGP, MPLS,",
      "and carrier-grade network design etc.",
      "...",
      "My professional journey began at AS59282,",
      "where I gained foundational experience in real-world ISP operations,",
      "giving me a solid understanding of network engineering in a production environment.",
      "",
      "$ ls -la skills/",
      "drwxr-xr-x  2 irsyad irsyad 4096 Jan 19 09:37 .",
      "drwxr-xr-x  3 irsyad irsyad 4096 Jan 19 09:37 ..",
      "-rw-r--r--  1 irsyad irsyad   42 Jan 19 09:37 routing-switching.txt",
      "-rw-r--r--  1 irsyad irsyad   38 Jan 19 09:37 advanced-Networking.txt",
      "-rw-r--r--  1 irsyad irsyad   45 Jan 19 09:37 service-provider.txt",
      "-rw-r--r--  1 irsyad irsyad   41 Jan 19 09:37 monitoring.txt",
      "-rw-r--r--  1 irsyad irsyad   48 Jan 19 09:37 platforms.txt",
      "",
      "$ cat contact.txt",
      "Email: hallo@irsyad.eu",
      "LinkedIn: www.linkedin.com/in/irsyadkhoirulanwar/",
      "Github: github.com/Irsyad1609",
      "Phone: +48 604-269-002",
      "Whatsapp: +48 604-269-002",
      "Whatsapp: +62 815-4107-5466",
      "",
      "$ _",
    ]
    setCommandHistory(initialCommands)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const executeCommand = (cmd: string) => {
    const newHistory = [...commandHistory]
    newHistory.push(`$ ${cmd}`)

    switch (cmd.toLowerCase()) {
      case "clear":
        setCommandHistory(["$ _"])
        return
      case "pwd":
        newHistory.push(currentPath)
        break
      case "date":
        newHistory.push(new Date().toString())
        break
      case "uptime":
        newHistory.push("up 2 days, 14:32, 1 user, load average: 0.15, 0.10, 0.05")
        break
      case "help":
        newHistory.push("Available commands: whoami, pwd, ls, cat [file], clear, date, uptime, help, sudo rm -rf /")
        newHistory.push("Files: about.txt, contact.txt, routing-switching.txt, advanced-networking.txt,")
        newHistory.push("       service-provider.txt, monitoring.txt, platforms.txt, certifications.txt")
        newHistory.push("       projects.txt skills/")

        break
      case "cat about.txt":
        newHistory.push("I'm a Network Engineer experienced in various projects. I specialize in designing,")
        newHistory.push("deploying, and managing network infrastructures, from enterprise WAN and data center network")
        newHistory.push("to service provider routing, as well as wired and wireless LAN environments.")
        break
      case "whoami":
        newHistory.push("IRSYAD KHOIRUL ANWAR")
        newHistory.push("Network Engineer")
        break
      case "sudo rm -rf /":
        newHistory.push("I'm sorry, I can't let you do that. This is a portfolio website!")
        break
      case "ls -la skills/":
        newHistory.push("drwxr-xr-x  2 irsyad irsyad 4096 Jan 19 09:37 .")
        newHistory.push("drwxr-xr-x  3 irsyad irsyad 4096 Jan 19 09:37 ..")
        newHistory.push("-rw-r--r--  1 irsyad irsyad   42 Jan 19 09:37 routing-switching.txt")
        newHistory.push("-rw-r--r--  1 irsyad irsyad   38 Jan 19 09:37 advanced-networking.txt")
        newHistory.push("-rw-r--r--  1 irsyad irsyad   45 Jan 19 09:37 service-provider.txt")
        newHistory.push("-rw-r--r--  1 irsyad irsyad   41 Jan 19 09:37 monitoring.txt")
        newHistory.push("-rw-r--r--  1 irsyad irsyad   48 Jan 19 09:37 platforms.txt")  
        break
      case "ls skills":
      case "ls skills/":
        newHistory.push("routing-switching.txt");
        newHistory.push("advanced-networking.txt");
        newHistory.push("service-provider.txt");
        newHistory.push("monitoring.txt");
        newHistory.push("platforms.txt");
        break;
      case "ls":
        newHistory.push("about.txt")
        newHistory.push("contact.txt")
        newHistory.push("skills/")
        newHistory.push("projects.txt")
        newHistory.push("certifications.txt")
        break
      case "cat certifications.txt":
        newHistory.push("• JNCIS-SP Routing and Switching")
        newHistory.push("• JNCIA-Junos")
        newHistory.push("• CCNA Training")
        newHistory.push("• APNIC & IDNIC Training Series - 2022 & 2023")
        break
      case "cat projects.txt":
        newHistory.push("• IXP Implementation (GPMIX) - Lampung's First Community IXP")
        newHistory.push("• Core Network Migration")
        newHistory.push("• BGP Peering Infrastructure (Google AS15169 & Meta AS32934)")
        newHistory.push("• Dual-Stack IPv4/IPv6 Migration")
        newHistory.push("• DNS Security Overhaul (RPZ, DoT/DoH)")
        newHistory.push("• Content Caching Infrastructure (GGC & MNA Deployment)")
        newHistory.push("• FTTH Network Redesign (GPON OLT Systems)")
        newHistory.push("• MPLS Traffic Engineering & Route Optimization")
        newHistory.push("• Network Automation Framework")
        newHistory.push("• Data Center Deployment (Equinix SG3, NTT Jakarta , CDCI)")
        break
      case "cat contact.txt":
        newHistory.push("Email: hallo@irsyad.eu")
        newHistory.push("LinkedIn: www.linkedin.com/in/irsyadkhoirulanwar/")
        newHistory.push("Github: github.com/Irsyad1609")
        newHistory.push("Phone: +48 604-269-002")
        newHistory.push("Whatsapp: +48 604-269-002")
        newHistory.push("Whatsapp: +62 815-4107-5466")
        break
      case "cat routing-switching.txt":
        newHistory.push("=== Routing & Switching ===")
        newHistory.push("• BGP (eBGP/iBGP/MP-BGP)")
        newHistory.push("• OSPFv2/v3, IS-IS, RIP")
        newHistory.push("• Static Routing, Routing Policy, Route Map")
        newHistory.push("• VLAN, QinQ")
        newHistory.push("• STP (PVST/RSTP/MSTP)")
        newHistory.push("• VRRP, Multicast (IGMP, PIM)")
        break
      case "cat advanced-networking.txt":
        newHistory.push("=== Advanced Networking ===")
        newHistory.push("• MPLS (LDP, RSVP-TE), MPLS-TE")
        newHistory.push("• L2VPN, L3VPN")
        newHistory.push("• EVPN (MPLS & VXLAN), VXLAN")
        newHistory.push("• MC-LAG, QoS, ACL")
        newHistory.push("• DHCP Snooping, DAI")
        newHistory.push("• EtherChannel (LACP)")
        newHistory.push("• IPsec VPN, SD-WAN")
        break
      case "cat service-provider.txt":
        newHistory.push("=== Service Provider & FTTH ===")
        newHistory.push("• PPPoE, DWDM")
        newHistory.push("• FTTH architecture")
        newHistory.push("• DNS (BIND/PowerDNS)")
        newHistory.push("• DHCP, DNS Security (RPZ, DoH/DoT)")
        newHistory.push("• NAT, Queueing")
        break
      case "cat monitoring.txt":
        newHistory.push("=== Monitoring & Tools ===")
        newHistory.push("• Zabbix, Grafana")
        newHistory.push("• MikroTik Dude")
        newHistory.push("• Wireshark, iPerf")
        newHistory.push("• Cacti, NetFlow/sFlow")
        break
      case "cat platforms.txt":
        newHistory.push("=== Platforms & Vendors ===")
        newHistory.push("Routers & Switches:")
        newHistory.push("• Juniper (MX/QFX/EX/ACX/SRX)")
        newHistory.push("• Cisco (ASR/Catalyst/Nexus)")
        newHistory.push("• Huawei (NE/CE/RTN), Arista")
        newHistory.push("• MikroTik (CCR/CRS)")
        newHistory.push("• Ruijie/Reyee, Extreme Networks")
        newHistory.push("• HPE Aruba, Dell S Series")
        newHistory.push("")
        newHistory.push("Servers & Security:")
        newHistory.push("• Dell PowerEdge, HP ProLiant, SuperMicro")
        newHistory.push("• Fortinet, pfSense, Ubiquiti")
        newHistory.push("")
        newHistory.push("Virtualization & Cloud:")
        newHistory.push("• Proxmox VE, VMware ESXi, KVM")
        newHistory.push("• GCP, AWS")
        newHistory.push("")
        newHistory.push("Operating Systems:")
        newHistory.push("• Linux (Debian/Ubuntu/CentOS)")
        newHistory.push("• FreeBSD")
        break
      default:
        newHistory.push(`bash: ${cmd}: command not found`)
    }

    newHistory.push("$ _")
    setCommandHistory(newHistory)
    setCurrentCommand("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(currentCommand)
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-green-400"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800"
      }`}
    >
      {/* Floating Header */}
      <header
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 ${isScrolled ? "md:hidden" : ""}`}
      >
        <div
          className={`backdrop-blur-md rounded-2xl border transition-all duration-300 ${
            isDark ? "bg-gray-900/20 border-gray-700/30" : "bg-white/20 border-white/30"
          } shadow-lg`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              <span className="font-mono text-sm">cd {currentPath}</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection("about")} className="hover:opacity-70 transition-opacity">
                About
              </button>
              <Link href="/blog" className="hover:opacity-70 transition-opacity">
                Blog
              </Link>
              <button onClick={() => scrollToSection("contact")} className="hover:opacity-70 transition-opacity">
                Contact
              </button>
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </nav>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="md:hidden p-2">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav
        className={`md:hidden fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 ${
          isScrolled ? "translate-y-0" : "translate-y-20 opacity-0"
        }`}
      >
        <div
          className={`backdrop-blur-md rounded-2xl border transition-all duration-300 ${
            isDark ? "bg-gray-900/20 border-gray-700/30" : "bg-white/20 border-white/30"
          } shadow-lg`}
        >
          <div className="flex items-center justify-around px-4 py-3">
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1"
              onClick={() => scrollToSection("about")}
            >
              <User className="w-4 h-4" />
              <span className="text-xs">About</span>
            </Button>
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <FileText className="w-4 h-4" />
                <span className="text-xs">Blog</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="w-4 h-4" />
              <span className="text-xs">Contact</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="flex flex-col items-center gap-1">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="text-xs">Theme</span>
            </Button>
          </div>
        </div>
      </nav>



      {/* Terminal Content */}
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-lg border transition-all duration-300 ${
              isDark ? "bg-gray-900/40 border-gray-700/30" : "bg-white/40 border-white/30"
            } backdrop-blur-sm shadow-xl`}
          >
            {/* Terminal Header */}
            <div
              className={`flex items-center justify-between px-4 py-3 border-b ${
                isDark ? "border-gray-700/30" : "border-white/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="font-mono text-sm ml-4">irsyad.eu@portofolio:~$</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Lampung, ID</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {commandHistory.map((line, index) => (
                  <div
                    key={index}
                    className={`${
                      line.startsWith("$")
                        ? isDark
                          ? "text-green-400"
                          : "text-blue-600"
                        : line.startsWith("===")
                          ? isDark
                            ? "text-yellow-400 font-bold"
                            : "text-purple-600 font-bold"
                          : isDark
                            ? "text-gray-300"
                            : "text-gray-700"
                    } ${line === "$ _" ? "animate-pulse" : ""}`}
                  >
                    {line === "$ _" ? (
                      <div className="flex items-center gap-2">
                        <span>$</span>
                        <input
                          type="text"
                          value={currentCommand}
                          onChange={(e) => setCurrentCommand(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="bg-transparent outline-none flex-1"
                          placeholder="Type a command... (try: help, or cat routing-switching.txt)"
                          autoFocus
                        />
                        <span className="animate-pulse">|</span>
                      </div>
                    ) : (
                      <span>{line}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div
              id="about"
              className={`rounded-lg border transition-all duration-300 ${
                isDark ? "bg-gray-900/40 border-gray-700/30" : "bg-white/40 border-white/30"
              } backdrop-blur-sm shadow-xl p-6`}
            >
              <h3 className="font-mono text-lg mb-4">$ cat projects.txt</h3>
              <div className="space-y-2 font-mono text-sm">
                <div>• IXP Implementation (GPMIX) - Lampung's First Community IXP</div>
                <div>• Core Network Migration</div>
                <div>• BGP Peering Infrastructure (Google AS15169 & Meta AS32934)</div>
                <div>• Dual-Stack IPv4/IPv6 Migration</div>
                <div>• DNS Security Overhaul (RPZ, DoT/DoH) / Trustpositif</div>
                <div>• Content Caching Infrastructure (GGC & MNA Deployment)</div>
                <div>• FTTH Network Redesign (GPON OLT Systems)</div>
                <div>• MPLS Traffic Engineering & Route Optimization</div>
                <div>• Network Automation Framework</div>
                <div>• Data Center Deployment (Equinix SG3, NTT Jakarta, CDCI)</div>
              </div>
            </div>

            <div
              id="contact"
              className={`rounded-lg border transition-all duration-300 ${
                isDark ? "bg-gray-900/40 border-gray-700/30" : "bg-white/40 border-white/30"
              } backdrop-blur-sm shadow-xl p-6`}
            >
              <h3 className="font-mono text-lg mb-4">$ cat certifications.txt</h3>
              <div className="space-y-2 font-mono text-sm">
                <a
                  href="https://www.credly.com/badges/fc5cc381-b6c8-4f95-9d50-121c37f1185f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  • JNCIS-SP Routing and Switching <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.credly.com/badges/e0087c27-e27a-4d4b-a497-5d8b6c20cfe9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  • JNCIA-Junos <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  • CCNA Training 
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                >
                  • APNIC & IDNIC Training Series - 2022 & 2023
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
