"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ArrowLeft, Copy, Check } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const [isDark, setIsDark] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const birdConfig1 = `router id YOUR-ROUTER-IP;

protocol device {
    scan time 10;
}

protocol kernel {
    export all;
    scan time 15;
}

protocol static announcement {
    import all;
    route YOURPREFIX reject;
}

protocol bgp upstream {
    import filter {
        accept;
    };
    export limit 10;
    export filter {
        if proto = "announcement" then accept;
    };
    local as YOUR-ASN;
    source address ROUTER-IP;
    graceful restart on;
    neighbor UPSTREAM-IP as UPSTREAM-ASN;
}`

  const birdConfig2 = `router id ROUTER-ID;

protocol device { 
    scan time 5; 
}

protocol direct { 
    ipv4; 
}

protocol direct { 
    ipv6; 
}

protocol static {
    ipv4;
    route $YOUR_V4_PREFIX reject;
}

protocol static {
    ipv4;
    route $YOUR_V6_PREFIX reject;
}

filter YOURASNv4 {
    if (net ~ [ $YOUR_V4_PREFIX ]) then accept;
    else reject;
}

filter YOURASNv6 {
    if (net ~ [ $YOUR_V6_PREFIX ]) then accept;
    else reject;
}

protocol bgp BGPTunnelV4 {
    local 10.249.1.2 as YOURASN;
    neighbor 10.249.1.1 as PEERASN;
    ipv4 {
        import all;
        export filter YOURASNv4;
    };
}

protocol bgp BGPTunnelV6 {
    local 2a0c:9a40:a001::2 as YOURASN;
    neighbor 2a0c:9a40:a001::1 as PEERASN;
    ipv6 {
        import all;
        export filter YOURASNv6;
    };
}`

  const birdCommands = `# Configure Bird with the config set in /etc/bird/bird.conf
birdc configure

# Show the Status of the BGP protocols
birdc show proto

# Show all routes you export to a specific upstream/peer
birdc show route export PROTONAME

# Shows all paths for 1.1.1.0/24 with details such as next-hop, communities and preference
birdc show route 1.1.1.0/24 all

# For the IPv6 CLI on Bird 1.x use birdc6`

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-green-400"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header className="fixed top-4 left-4 right-4 z-50">
        <div
          className={`backdrop-blur-md rounded-2xl border transition-all duration-300 ${
            isDark ? "bg-gray-900/20 border-gray-700/30" : "bg-white/20 border-white/30"
          } shadow-lg`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <span className="font-mono text-sm">cd /root/irsyad.eu/blog</span>
            </div>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-lg border transition-all duration-300 ${
              isDark ? "bg-gray-900/40 border-gray-700/30" : "bg-white/40 border-white/30"
            } backdrop-blur-sm shadow-xl p-8`}
          >
            <h1 className="text-3xl font-bold mb-8">Network Configuration Blog</h1>

            {/* BGP Configuration Article */}
            <article className="space-y-6">
              <header>
                <h2 className="text-2xl font-semibold mb-4">First BGP Session with BIRD</h2>
                <div className="flex items-center gap-4 text-sm opacity-70 mb-6">
                  <span>Published: January 19, 2025</span>
                  <span>•</span>
                  <span>Category: BGP Configuration</span>
                </div>
              </header>

              <div className="prose prose-lg max-w-none">
                <p>To get your first BGP Session up and running you will need the following ready:</p>

                <ul className="list-disc list-inside space-y-2 my-6">
                  <li>Your own ASN</li>
                  <li>Your peers ASN (eg. your VPS providers ASN)</li>
                  <li>Peering IPs (provided by peer usually)</li>
                  <li>A prefix you plan to announce</li>
                </ul>

                <p>Bird is easy to use and features a config file like syntax.</p>

                <p>To install bird on Debian run as root:</p>

                <div
                  className={`rounded-lg border p-4 my-6 ${
                    isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-100/50 border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono">bash</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("apt install bird", "install")}
                      className="p-1"
                    >
                      {copiedCode === "install" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <code className="font-mono text-sm">apt install bird</code>
                </div>

                <p>
                  The bird config is stored in{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/etc/bird/bird.conf</code> and{" "}
                  <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/etc/bird/bird6.conf</code> on Bird
                  1.6.x
                </p>

                <p>
                  Below is a simple BIRD BGP Config with one Upstream and a single Prefix announcement. You can use and
                  adapt this example for both v4 and v6. You will need to replace the variables written in all caps with
                  your ASNs, IPs etc.
                </p>

                <p>The following examples are specific for Bird 1.6.x.</p>

                <div
                  className={`rounded-lg border p-4 my-6 ${
                    isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-100/50 border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono">bird.conf (Bird 1.6.x)</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(birdConfig1, "config1")}
                      className="p-1"
                    >
                      {copiedCode === "config1" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="font-mono text-sm overflow-x-auto">
                    <code>{birdConfig1}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Useful Bird commands:</h3>

                <div
                  className={`rounded-lg border p-4 my-6 ${
                    isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-100/50 border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono">bash</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(birdCommands, "commands")}
                      className="p-1"
                    >
                      {copiedCode === "commands" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="font-mono text-sm overflow-x-auto">
                    <code>{birdCommands}</code>
                  </pre>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Bird 2 Config Example:</h3>

                <div
                  className={`rounded-lg border p-4 my-6 ${
                    isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-100/50 border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono">bird.conf (Bird 2.x)</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(birdConfig2, "config2")}
                      className="p-1"
                    >
                      {copiedCode === "config2" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <pre className="font-mono text-sm overflow-x-auto">
                    <code>{birdConfig2}</code>
                  </pre>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm">
                    <strong>Note:</strong> Remember to replace all variables in CAPS with your actual values before
                    using these configurations in production.
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Related Articles */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div
              className={`rounded-lg border transition-all duration-300 ${
                isDark ? "bg-gray-900/40 border-gray-700/30" : "bg-white/40 border-white/30"
              } backdrop-blur-sm shadow-xl p-6`}
            >
              <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
              <p className="text-sm opacity-70 mb-4">OSPF Configuration Guide</p>
              <p className="text-sm">
                Learn how to configure OSPF routing protocol with practical examples and best practices.
              </p>
            </div>

            <div
              className={`rounded-lg border transition-all duration-300 ${
                isDark ? "bg-gray-900/40 border-gray-700/30" : "bg-white/40 border-white/30"
              } backdrop-blur-sm shadow-xl p-6`}
            >
              <h3 className="font-semibold text-lg mb-2">Coming Soon</h3>
              <p className="text-sm opacity-70 mb-4">MPLS L3VPN Setup</p>
              <p className="text-sm">Step-by-step guide to implementing MPLS L3VPN with Juniper and Cisco equipment.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
