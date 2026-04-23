import React from "react";
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Server,
  Database,
  Cloud,
  Zap,
  TrendingUp,
  Globe,
  Shield,
  RefreshCw,
} from "lucide-react";
import { motion } from "motion/react";

export function APIStatusPage() {
  const systemStatus = {
    overall: "operational",
    lastUpdated: "2 minutes ago",
    uptime: "99.98%",
  };

  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "100%",
      responseTime: "45ms",
      icon: Server,
    },
    {
      name: "Authentication Service",
      status: "operational",
      uptime: "99.99%",
      responseTime: "32ms",
      icon: Shield,
    },
    {
      name: "Database Cluster",
      status: "operational",
      uptime: "99.97%",
      responseTime: "12ms",
      icon: Database,
    },
    {
      name: "Emissions API",
      status: "operational",
      uptime: "99.96%",
      responseTime: "78ms",
      icon: Activity,
    },
    {
      name: "Reporting Engine",
      status: "operational",
      uptime: "99.95%",
      responseTime: "156ms",
      icon: TrendingUp,
    },
    {
      name: "File Storage",
      status: "operational",
      uptime: "99.98%",
      responseTime: "89ms",
      icon: Cloud,
    },
    {
      name: "Analytics Service",
      status: "operational",
      uptime: "99.94%",
      responseTime: "234ms",
      icon: Activity,
    },
    {
      name: "Webhook Delivery",
      status: "operational",
      uptime: "99.92%",
      responseTime: "112ms",
      icon: Zap,
    },
  ];

  const recentIncidents = [
    {
      date: "March 28, 2026",
      title: "Scheduled Maintenance - Database Upgrade",
      status: "resolved",
      duration: "2 hours",
      impact: "Minor",
      description:
        "Planned database maintenance completed successfully with minimal service disruption.",
    },
    {
      date: "March 15, 2026",
      title: "API Response Time Degradation",
      status: "resolved",
      duration: "45 minutes",
      impact: "Minor",
      description:
        "Temporary increase in API response times due to high traffic. Resolved by scaling infrastructure.",
    },
    {
      date: "February 20, 2026",
      title: "Authentication Service Outage",
      status: "resolved",
      duration: "15 minutes",
      impact: "Major",
      description:
        "Brief authentication service outage affecting login functionality. Resolved quickly with no data loss.",
    },
  ];

  const upcomingMaintenance = [
    {
      date: "April 15, 2026",
      time: "02:00 - 04:00 AM IST",
      title: "Infrastructure Security Updates",
      impact: "No Expected Downtime",
      description: "Rolling security updates across all servers.",
    },
    {
      date: "April 22, 2026",
      time: "01:00 - 03:00 AM IST",
      title: "Database Performance Optimization",
      impact: "Minimal Service Impact",
      description: "Database indexing and optimization for improved performance.",
    },
  ];

  const metrics = [
    {
      label: "Current Uptime",
      value: systemStatus.uptime,
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Avg Response Time",
      value: "94ms",
      icon: Zap,
      color: "blue",
    },
    {
      label: "Active Users",
      value: "12,847",
      icon: Globe,
      color: "purple",
    },
    {
      label: "API Requests/min",
      value: "24.5k",
      icon: Activity,
      color: "amber",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "emerald";
      case "degraded":
        return "amber";
      case "outage":
        return "red";
      default:
        return "neutral";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircle2;
      case "degraded":
        return AlertCircle;
      case "outage":
        return AlertCircle;
      default:
        return Activity;
    }
  };

  const StatusIcon = getStatusIcon(systemStatus.overall);
  const statusColor = getStatusColor(systemStatus.overall);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
            API Status
          </h1>
          <p className="text-neutral-500 font-bold mt-2">
            Real-time system status and performance metrics
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-black text-sm hover:bg-neutral-200 transition-all">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Overall Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br from-${statusColor}-50 to-${statusColor}-100 rounded-3xl border-2 border-${statusColor}-200 p-8`}
      >
        <div className="flex items-start gap-6">
          <div className={`w-16 h-16 bg-${statusColor}-600 rounded-2xl flex items-center justify-center shrink-0`}>
            <StatusIcon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className={`text-2xl font-black text-${statusColor}-900`}>
                All Systems Operational
              </h2>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 bg-${statusColor}-500 rounded-full animate-pulse`}></div>
                <span className={`text-xs font-black text-${statusColor}-700 uppercase tracking-widest`}>
                  Live
                </span>
              </div>
            </div>
            <p className={`text-${statusColor}-800 font-bold mb-4`}>
              All services are running normally. No incidents reported.
            </p>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 text-${statusColor}-600`} />
              <span className={`text-sm font-bold text-${statusColor}-700`}>
                Last updated: {systemStatus.lastUpdated}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl border-2 border-neutral-100 p-6 shadow-lg"
          >
            <div className={`w-12 h-12 bg-${metric.color}-50 rounded-xl flex items-center justify-center mb-4`}>
              <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
            </div>
            <p className="text-3xl font-black text-neutral-900">{metric.value}</p>
            <p className="text-sm font-bold text-neutral-500 mt-1">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Services Status */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Service Status
        </h2>
        <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border-2 border-neutral-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 bg-${getStatusColor(service.status)}-50 rounded-xl flex items-center justify-center`}>
                    <service.icon className={`w-5 h-5 text-${getStatusColor(service.status)}-600`} />
                  </div>
                  <div>
                    <h3 className="font-black text-neutral-900">{service.name}</h3>
                    <p className="text-xs text-neutral-500 font-bold">
                      {service.responseTime} • {service.uptime} uptime
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 bg-${getStatusColor(service.status)}-500 rounded-full`}></div>
                  <span className={`text-xs font-black text-${getStatusColor(service.status)}-600 uppercase tracking-widest`}>
                    {service.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Recent Incidents
        </h2>
        <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 space-y-6">
          {recentIncidents.map((incident, idx) => (
            <div
              key={idx}
              className="pb-6 border-b-2 border-neutral-100 last:border-0 last:pb-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-neutral-900">{incident.title}</h3>
                </div>
                <span className="text-xs font-black text-neutral-400 uppercase tracking-widest">
                  {incident.date}
                </span>
              </div>
              <p className="text-sm text-neutral-600 font-bold mb-3 ml-8">
                {incident.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 ml-8">
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-lg">
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                    {incident.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-lg">
                  <Clock className="w-3 h-3 text-neutral-600" />
                  <span className="text-xs font-bold text-neutral-600">
                    {incident.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg">
                  <span className="text-xs font-black text-blue-700 uppercase tracking-widest">
                    {incident.impact} Impact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div>
        <h2 className="text-2xl font-black text-neutral-900 mb-6">
          Scheduled Maintenance
        </h2>
        <div className="space-y-4">
          {upcomingMaintenance.map((maintenance, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-black text-blue-900 mb-1">
                    {maintenance.title}
                  </h3>
                  <p className="text-sm text-blue-700 font-bold">
                    {maintenance.date} • {maintenance.time}
                  </p>
                </div>
                <div className="px-4 py-2 bg-blue-100 rounded-xl">
                  <span className="text-xs font-black text-blue-800 uppercase tracking-widest">
                    Scheduled
                  </span>
                </div>
              </div>
              <p className="text-sm text-blue-800 font-bold mb-3">
                {maintenance.description}
              </p>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-black text-blue-700">
                  Expected Impact: {maintenance.impact}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subscribe to Updates */}
      <div className="bg-white rounded-3xl border-2 border-neutral-100 p-8 text-center">
        <Activity className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-neutral-900 mb-2">
          Stay Updated
        </h2>
        <p className="text-neutral-600 font-bold mb-6 max-w-2xl mx-auto">
          Subscribe to our status page to receive real-time notifications about
          service updates, incidents, and scheduled maintenance.
        </p>
        <button className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
          <Globe className="w-5 h-5" />
          Subscribe to Updates
        </button>
      </div>
    </div>
  );
}
