"use client";

import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, X, Loader2 } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info" | "loading";
  duration?: number; // in milliseconds
  onClose: () => void;
}

export default function Toast({ message, type = "info", duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Jika loading, jangan auto-hide
    if (type === "loading") return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, type]);

  // Progress bar animation untuk loading
  useEffect(() => {
    if (type !== "loading") return;

    const intervalTime = 30;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = ((totalSteps - currentStep) / totalSteps) * 100;
      setProgress(Math.max(0, newProgress));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [duration, type]);

  const getStyles = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800",
          icon: CheckCircle,
          iconColor: "text-green-600"
        };
      case "error":
        return {
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          textColor: "text-red-800",
          icon: AlertCircle,
          iconColor: "text-red-600"
        };
      case "loading":
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
          icon: Loader2,
          iconColor: "text-blue-600"
        };
      default:
        return {
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800",
          icon: AlertCircle,
          iconColor: "text-blue-600"
        };
    }
  };

  const styles = getStyles();
  const Icon = styles.icon;

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 transform ${
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-2"
      }`}
    >
      <div className={`${styles.bgColor} border ${styles.borderColor} rounded-lg shadow-lg overflow-hidden`}>
        <div className="flex items-start gap-3 p-4">
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${styles.iconColor} ${type === "loading" ? "animate-spin" : ""}`} />
          <span className={`flex-1 text-sm font-medium ${styles.textColor}`}>{message}</span>
          {type !== "loading" && (
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className={`flex-shrink-0 ${styles.textColor} hover:opacity-70`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Progress Bar - Show pada loading type */}
        {type === "loading" && (
          <div className="h-1 bg-blue-200 w-full">
            <div
              className="h-full bg-blue-500 transition-all ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
