import { AnimatePresence, motion } from "framer-motion";
import { BellIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "../../utils/functions";

type Props = {
	onClick?: () => void;
	text?: string;
	className?: string;
	unsubmittedBgColor?: string;
	submittedBgColor?: string;
};

export const SubscribeButton = ({
	onClick,
	text = "Subscribe",
	className = "",
	unsubmittedBgColor = "rgba(255, 0, 0, 1)",
	submittedBgColor = "rgba(0, 0, 0, 1)",
}: Props) => {
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const { theme, systemTheme } = useTheme();

	useEffect(() => {
		if (isAnimating) {
			const timer = setTimeout(() => {
				setIsAnimating(false);
			}, 1200);
			return () => clearTimeout(timer);
		}
	}, [isAnimating]);

	const handleClick = () => {
		if (!isSubscribed) {
			setIsAnimating(true);
		}
		setIsSubscribed(!isSubscribed);
		if (onClick) {
			onClick();
		}
	};

	const createCircles = (count = 20) => {
		return Array.from({ length: count }, (_, i) => {
			const angle = (i / count) * 2 * Math.PI;
			const radius = Math.random() * 100 + 50;
			const endX = Math.cos(angle) * radius;
			const endY = Math.sin(angle) * radius;

			const shapes = ["circle", "star"];
			const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

			return (
				<motion.div
					key={i}
					className={`absolute ${
						randomShape === "circle" ? "rounded-full" : ""
					}`}
					initial={{
						opacity: 0,
						scale: 0,
						x: "-50%",
						y: "-50%",
						left: "50%",
						top: "50%",
						rotate: 0,
					}}
					animate={{
						opacity: [0, 1, 0],
						scale: [0, Math.random() * 0.5 + 0.7, 0],
						x: ["-50%", `calc(${endX}px - 50%)`],
						y: ["-50%", `calc(${endY}px - 50%)`],
						rotate: [0, Math.random() * 360],
					}}
					transition={{
						duration: 1,
						delay: Math.random() * 0.1,
						ease: "easeInOut",
					}}
					style={{
						width: `${Math.random() * 2 + 10}px`,
						height: `${Math.random() * 2 + 10}px`,
						backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
						clipPath:
							randomShape === "star"
								? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
								: "",
						boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
					}}
				/>
			);
		});
	};

	const buttonBackgroundColor = isAnimating
		? [unsubmittedBgColor, submittedBgColor]
		: isSubscribed
		? submittedBgColor
		: unsubmittedBgColor;

	const buttonTextColor = {
		light: isSubscribed ? "black" : "white",
		dark: isSubscribed ? "white" : "black",
	};

	// Determine the current theme, handling 'system' case
	const currentTheme = theme === "system" ? systemTheme : theme;

	return (
		<motion.div className="relative w-fit">
			{isSubscribed ? createCircles() : null}
			<motion.button
				onClick={handleClick}
				layout
				animate={{
					backgroundColor: buttonBackgroundColor,
				}}
				transition={{
					backgroundColor: {
						duration: isAnimating ? 1.2 : 0.3,
						times: isAnimating
							? [
									0, 0.0625, 0.125, 0.1875, 0.25, 0.3125, 0.375, 0.4375, 0.5,
									0.5625, 0.625, 0.6875, 0.75, 0.8125, 0.875, 0.9375, 1,
							  ]
							: [0, 1],
					},
				}}
				style={{
					width: isSubscribed ? "170px" : "140px",
				}}
				className={cn(
					"cursor-pointer flex relative justify-center items-center px-10 py-2 rounded-full overflow-hidden text-white ",
					className
				)}
				data-subscribed={isSubscribed}
			>
				<AnimatePresence mode="wait">
					{isSubscribed ? (
						<motion.div
							key="subscribed"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className={`flex items-center ${
								currentTheme === "dark"
									? buttonTextColor.dark
									: buttonTextColor.light
							}`}
						>
							<motion.div
								animate={{
									rotate: [0, -15, 15, -15, 15, -15, 15, 0],
									transition: { duration: 0.7, delay: 0.2 },
								}}
								style={{ transformOrigin: "top center" }}
							>
								<BellIcon className="w-4 h-4 mr-2" />
							</motion.div>
							Subscribed
						</motion.div>
					) : (
						<motion.div
							key="subscribe"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
						>
							{text}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.button>
		</motion.div>
	);
};
