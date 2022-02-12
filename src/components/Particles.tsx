import { useTheme } from '@mui/material'
import { useRef } from 'react'
import Particles, { IParticlesParams } from 'react-tsparticles'

const ParticlesContainer: React.FC<{
}> = (props) => {

	const container = useRef(null)
	const theme = useTheme()


	const config : IParticlesParams = {
		style: {
		},
		options: {
			fullScreen: false,
			style: {

			},
			fpsLimit: 60,
			background: {
				color: theme.palette.background.default
			},
			interactivity: {
			  	detectsOn: 'canvas',
			 	events: {
					onclick: { enable: true, mode: "push" },
					onhover: {
					  	enable: true,
						mode: "attract",
						parallax: { enable: false, force: 60, smooth: 10 }
				},
				resize: false
			},
			modes: {
				push: { quantity: 4 },
				attract: { distance: 200, duration: 0.4, factor: 5 }
			  }
			},
			particles: {
			  	color: { value: theme.palette.text.primary },
			  	line_linked: {
				color: theme.palette.text.primary,
				distance: 150,
				enable: true,
				opacity: 0.4,
				width: 1
			},
			move: {
				attract: { enable: false, rotateX: 600, rotateY: 1200 },
				bounce: false,
				direction: "none",
				enable: true,
				out_mode: "out",
				random: false,
				speed: 2,
				straight: false
			},
			number: { density: { enable: true, value_area: 800 }, value: 80 },
			opacity: {
				anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
				random: false,
				value: 0.5
			},
			shape: {
				character: {
					fill: false,
					font: "Verdana",
					style: "",
					value: "*",
					weight: "400"
				},
				polygon: { nb_sides: 5 },
				stroke: { color: "#000000", width: 0 },
				type: "circle"
			},
			size: {
				anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
				random: true,
				value: 5
			  }
			},
			polygon: {
			  	draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
			  	move: { radius: 10 },
			  	scale: 1,
			  	type: undefined,
			  	url: ""
			},
			retina_detect: true
		}
	}

	return (
		<Particles style={config.style} options={config.options} />
	)
}

export default ParticlesContainer