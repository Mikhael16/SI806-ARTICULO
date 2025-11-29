document.addEventListener('DOMContentLoaded', () => {
    const stages = [
        {
            id: 'checkout',
            name: 'Checkout',
            icon: 'fa-brands fa-github',
            desc: 'Descarga el código fuente más reciente desde el repositorio GitHub.',
            time: '10s',
            command: 'git checkout'
        },
        {
            id: 'deps',
            name: 'Dependencias',
            icon: 'fa-solid fa-box-open',
            desc: 'Verifica que Docker, Python y otras herramientas necesarias estén instaladas.',
            time: '5s',
            command: 'docker --version'
        },
        {
            id: 'lint',
            name: 'Linting',
            icon: 'fa-solid fa-check-double',
            desc: 'Análisis estático de código para asegurar calidad y estándares (flake8).',
            time: '30s',
            command: 'flake8 app/'
        },
        {
            id: 'test',
            name: 'Tests Unitarios',
            icon: 'fa-solid fa-vial',
            desc: 'Ejecución de suite de pruebas unitarias con Pytest.',
            time: '90s',
            command: 'pytest tests/'
        },
        {
            id: 'build',
            name: 'Build Docker',
            icon: 'fa-brands fa-docker',
            desc: 'Construcción de la imagen Docker optimizada para producción.',
            time: '180s',
            command: 'docker-compose build'
        },
        {
            id: 'deploy',
            name: 'Deploy',
            icon: 'fa-solid fa-cloud-arrow-up',
            desc: 'Despliegue automático de los contenedores en el entorno de producción.',
            time: '15s',
            command: 'docker-compose up -d'
        }
    ];

    const pipelineStagesContainer = document.querySelector('.pipeline-stages');
    const detailsCard = document.getElementById('stage-details');
    const stageTitle = document.getElementById('stage-title');
    const stageDesc = document.getElementById('stage-desc');
    const stageTime = document.getElementById('stage-time');
    const stageCommand = document.getElementById('stage-command');

    // Render stages
    stages.forEach((stage, index) => {
        const stageNode = document.createElement('div');
        stageNode.className = 'stage-node';
        stageNode.dataset.id = stage.id;
        
        stageNode.innerHTML = `
            <div class="stage-marker">
                <i class="${stage.icon}"></i>
            </div>
            <span class="stage-name">${stage.name}</span>
        `;

        stageNode.addEventListener('click', () => {
            // Remove active class from all
            document.querySelectorAll('.stage-node').forEach(n => n.classList.remove('active'));
            // Add active class to clicked
            stageNode.classList.add('active');
            // Update details
            updateDetails(stage);
        });

        pipelineStagesContainer.appendChild(stageNode);
    });

    function updateDetails(stage) {
        detailsCard.classList.remove('hidden');
        stageTitle.textContent = stage.name;
        stageDesc.textContent = stage.desc;
        stageTime.innerHTML = `<i class="fa-regular fa-clock"></i> ${stage.time}`;
        stageCommand.innerHTML = `<i class="fa-solid fa-terminal"></i> ${stage.command}`;
    }

    // Select first stage by default
    if (stages.length > 0) {
        const firstStage = document.querySelector('.stage-node');
        if (firstStage) {
            firstStage.click();
        }
    }
});
