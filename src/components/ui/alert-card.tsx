import * as React from "react";
import { m, LazyMotion, domAnimation, AnimatePresence, type Variants, type HTMLMotionProps } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";

// Animation variants for the whole card
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25,
      staggerChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0, 
    y: 20, 
    scale: 0.98,
    transition: { duration: 0.2 }
  }
};

// Animation variants for child elements for a staggered effect
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

// Define the props for the AlertCard component
export interface AlertCardProps extends HTMLMotionProps<"div"> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
  isVisible: boolean;
  onDismiss?: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

const AlertCard = ({
    className,
    icon,
    title,
    description,
    buttonText,
    onButtonClick,
    isVisible,
    onDismiss,
    ...props
  }: AlertCardProps) => {

    return (
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isVisible && (
            <m.div
              className={cn(
                "relative w-full max-w-sm overflow-hidden rounded-2xl p-6 shadow-2xl",
                "bg-zinc-900 border border-zinc-800 text-white", // standard tailwind dark card
                className
              )}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="alert"
              aria-live="assertive"
              {...props}
            >
              {/* Optional dismiss button */}
              {onDismiss && (
                <m.div variants={itemVariants} className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full hover:bg-black/10"
                    onClick={onDismiss}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Dismiss</span>
                  </Button>
                </m.div>
              )}

              {/* Icon Container */}
              {icon && (
                <m.div 
                  variants={itemVariants}
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e87a1e]/10 border border-[#e87a1e]/20"
                >
                  {icon}
                </m.div>
              )}

              {/* Title */}
              <m.h3 
                variants={itemVariants}
                className="text-2xl font-bold tracking-tight text-[#e87a1e] font-sqr"
              >
                {title}
              </m.h3>

              {/* Description */}
              <m.p variants={itemVariants} className="mt-2 text-sm text-zinc-400 max-w-[80%]">
                {description}
              </m.p>
              
              {/* Action Button */}
              <m.div variants={itemVariants} className="mt-6 w-full">
                <Button 
                  onClick={onButtonClick}
                  className="w-full bg-[#e87a1e] text-white hover:bg-[#e87a1e]/90 font-sqr"
                  size="lg"
                  type="button"
                >
                  {buttonText}
                </Button>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    );
  };

export { AlertCard };
