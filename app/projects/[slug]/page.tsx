import projects from '../data.json';
import Project from './project';

export default function ProjectPage(props: {
	params: {
		slug: string
	}
}) {

	const project = projects.find(project => project.slug === props.params.slug);

	if (!project) {
		return (
			<div>404</div>
		)
	}

	return (
		<Project
			project={project}
		/>
	)
}