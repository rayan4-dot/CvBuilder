document.addEventListener('DOMContentLoaded', function () {
    let currentStep = 0;
    const steps = document.querySelectorAll('.step');
  
    // Manage navigation between steps
    function showStep() {
        steps.forEach((step, index) => {
            step.classList.toggle('hidden', index !== currentStep);
        });
        updateProgressBar();
    }
  
    function updateProgressBar() {
        const indicators = document.querySelectorAll('[id^="step-"]');
        indicators.forEach((indicator, index) => {
            if (index < currentStep) {
                indicator.classList.add('bg-green-600');
                indicator.classList.remove('bg-blue-600');
            } else if (index === currentStep) {
                indicator.classList.add('bg-blue-600');
                indicator.classList.remove('bg-green-600');
            } else {
                indicator.classList.remove('bg-green-600', 'bg-blue-600');
                indicator.classList.add('bg-gray-300');
            }
        });
    }
});
