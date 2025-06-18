import { AnimatePresence, motion } from "framer-motion";
import { AxeIcon, Home } from "lucide-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

function App() {
	const location = useLocation();

	return (
		<>
			<Nav />
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route
						path="/"
						element={
							<PageWrapper>
								<Home className="text-gray-800 w-64 h-64" />
							</PageWrapper>
						}
					/>
					<Route
						path="/about"
						element={
							<PageWrapper>
								<AxeIcon className="text-gray-800 w-64 h-64" />
							</PageWrapper>
						}
					/>
				</Routes>
			</AnimatePresence>
		</>
	);
}
export default App;

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			className="flex items-center justify-center h-screen"
		>
			{children}
		</motion.div>
	);
};

const Nav = () => {
	return (
		<nav className="bg-gray-800 backdrop-blur-md p-4 flex justify-between drop-shadow-amber-300 shadow-2xl z-50">
			<div className="flex items-center justify-center gap-4 w-full">
				<Link
					to="/"
					className="text-white text-2xl font-bold hover:text-gray-300"
				>
					Home
				</Link>
				<Link
					to="/about"
					className="text-white text-2xl font-bold hover:text-gray-300"
				>
					About
				</Link>
			</div>
		</nav>
	);
};
