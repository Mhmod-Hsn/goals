import { useEffect, useRef } from "react";

const url = "/video/big_buck_bunny.mp4";
const spread = 100;
const fps = 1;
export const VideoAmbient = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!videoRef.current || !canvasRef.current) return;
		const video = videoRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const drawFrame = () => {
			if (video.paused || video.ended || !ctx) return;
			ctx.drawImage(
				video,
				0,
				0,
				video.videoWidth,
				video.videoHeight,
				0,
				0,
				canvas.width,
				canvas.height
			);
			setTimeout(drawFrame, 1000 / fps);
		};

		const handlePlay = () => {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			drawFrame();
		};

		video.addEventListener("play", handlePlay);

		return () => {
			video.removeEventListener("play", handlePlay);
		};
	}, [canvasRef, videoRef]);

	return (
		<>
			<div className={`w-[100vw] h-[100vh]  flex items-center justify-center`}>
				<div
					className="relative flex items-center justify-center"
					style={{
						padding: `${spread}px`,
					}}
				>
					<video
						className=" z-[11]"
						ref={videoRef}
						src={url}
						controls
						autoPlay
						loop
						muted
						playsInline
					/>
					<canvas
						ref={canvasRef}
						className="absolute w-[100%] h-[100%] z-[10] blur-[200px] brightness-75 contrast-125 saturate-50 transition duration-1000 ease-in-out"
					/>
				</div>
			</div>
		</>
	);
};
