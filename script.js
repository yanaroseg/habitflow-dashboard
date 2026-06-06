// ==========================================================================
// HABITFLOW STATE MANAGEMENT CONTROLLER LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // Core Application State Store Array
    let disciplines = JSON.parse(localStorage.getItem("habitFlowData")) || [
        { id: 1, title: "Review UI Architecture Layouts", completed: true },
        { id: 2, title: "Refactor JavaScript DOM Codebase", completed: false },
        { id: 3, title: "Analyze Advanced Grid Systems", completed: false }
    ];

    // Select Required UI Node Targets
    const habitsListContainer = document.getElementById("habits-list");
    const habitFormInput = document.getElementById("habit-form");
    const habitTextField = document.getElementById("habit-input");
    
    // Select Required Analytics Metrics Node Targets
    const percentageLabel = document.getElementById("completion-percentage");
    const radialOuterRing = document.querySelector(".radial-outer");
    const totalStatCounter = document.getElementById("total-stat");
    const doneStatCounter = document.getElementById("done-stat");

    /**
     * Commits current app execution state arrays down to native localStorage cache
     */
    function saveToLocalStorage() {
        localStorage.setItem("habitFlowData", JSON.stringify(disciplines));
    }

    /**
     * Calculates array records to map structural percentage parameters 
     * and triggers reactive rendering of layout dashboards elements.
     */
    function calculateMetrics() {
        const totalCount = disciplines.length;
        const completedCount = disciplines.filter(item => item.completed).length;
        
        // Calculate relative completion ratio percentages integer values
        const ratioPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
        
        // Update literal context metrics texts values elements strings
        totalStatCounter.textContent = totalCount;
        doneStatCounter.textContent = completedCount;
        percentageLabel.textContent = `${ratioPercentage}%`;

        // Update radial progress ring visualization via dynamic CSS background gradients manipulation
        radialOuterRing.style.background = `conic-gradient(var(--accent-emerald) ${ratioPercentage}%, var(--bg-surface-elevated) ${ratioPercentage}%)`;
    }

    /**
     * Traverses state configurations arrays items and explicitly crafts structural DOM nodes
     */
    function renderDashboardList() {
        habitsListContainer.innerHTML = "";

        if (disciplines.length === 0) {
            habitsListContainer.innerHTML = `<div class="caption-lbl" style="text-align:center; padding: 20px 0;">Workspace clear. Add a discipline to initiate tracking vectors.</div>`;
            calculateMetrics();
            return;
        }

        disciplines.forEach(item => {
            // Instantiate structural sub-container shell nodes
            const habitCard = document.createElement("div");
            habitCard.className = `habit-item ${item.completed ? 'is-done' : ''}`;
            habitCard.setAttribute("data-id", item.id);

            habitCard.innerHTML = `
                <div class="habit-left">
                    <div class="check-trigger">
                        <i class="fas fa-check"></i>
                    </div>
                    <span class="habit-title">${item.title}</span>
                </div>
                <button class="delete-habit-btn"><i class="far fa-trash-alt"></i></button>
            `;

            // Event Listener: Checkbox Trigger Action Toggle
            habitCard.querySelector(".check-trigger").addEventListener("click", () => {
                item.completed = !item.completed;
                saveToLocalStorage();
                renderDashboardList();
            });

            // Event Listener: Row Record Node Explicit Deletion Link
            habitCard.querySelector(".delete-habit-btn").addEventListener("click", () => {
                disciplines = disciplines.filter(record => record.id !== item.id);
                saveToLocalStorage();
                renderDashboardList();
            });

            habitsListContainer.appendChild(habitCard);
        });

        calculateMetrics();
    }

    // Intercept Submit Triggers To Process Text Input Elements Packages
    habitFormInput.addEventListener("submit", (e) => {
        e.preventDefault();
        const targetStringValue = habitTextField.value.trim();

        if (!targetStringValue) return;

        const structuralPayload = {
            id: Date.now(),
            title: targetStringValue,
            completed: false
        };

        disciplines.push(structuralPayload);
        saveToLocalStorage();
        renderDashboardList();
        
        // Wipe structural input form strings inputs cleanly
        habitTextField.value = "";
    });

    // Run Initial Render Vector Engine Sequences On Window Mount Complete
    renderDashboardList();
});