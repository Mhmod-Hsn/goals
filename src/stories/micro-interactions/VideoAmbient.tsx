import { useEffect, useRef } from "react";

const url = "/video/big_buck_bunny.mp4";
const spread = 100;
const fps = 30;
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
				10, //video.videoWidth,
				6, //video.videoHeight,
				0,
				0,
				canvas.width,
				canvas.height
			);
			setTimeout(drawFrame, 1000 / fps);
		};

		const handlePlay = () => {
			canvas.width = video.videoWidth + spread * 2;
			canvas.height = video.videoHeight + spread * 2;
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
						className=" z-[11] rounded-2xl"
						ref={videoRef}
						src={url}
						controls
						autoPlay
						loop
						muted
						playsInline
					/>
					<canvas
						width="10"
						height="6"
						ref={canvasRef}
						className="absolute w-[100%] h-[100%] z-[10] blur-[100px] brightness-75 contrast-125 saturate-50 transition duration-1000 ease-in-out"
					/>
				</div>
			</div>
		</>
	);
};
