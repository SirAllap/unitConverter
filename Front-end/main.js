const app = new Vue({
    el: "#main-container",
    data: {
        conversions: [
            { unit: "Km → Miles", fromUnit: "km", val: "km2mil" },
            { unit: "Miles → Km", fromUnit: "Miles", val: "mil2km" },
            { unit: "Pies → Metros", fromUnit: "Pies", val: "pies2m" },
            { unit: "Metros → Pies", fromUnit: "Metros", val: "m2pies" },
            { unit: "Cm → Pulgadas", fromUnit: "Cm", val: "cm2pul" },
            { unit: "Pulgadas → Cm", fromUnit: "Pulgadas", val: "pul2cm" },
        ],
        savedConversions: [],
        inputNumber: 0,
        inputOption: "",
        resultOfConversion: 0,
        unitToChange: "",
        unitChanged: "",
        errorMsg: ""
    },
    mounted() {
        if (localStorage.getItem('savedConversions')) {
            try {
                this.savedConversions = JSON.parse(localStorage.getItem('savedConversions'));
            } catch (e) {
                localStorage.removeItem('savedConversions');
            }
        }
    },
    methods: {
        convert() {
            if (this.inputOption === "km2mil" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "km"
                this.unitChanged = "miles"
                return (this.resultOfConversion = (this.inputNumber * 0.6213711922).toFixed(2))
            } else if (this.inputOption === "mil2km" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "miles"
                this.unitChanged = "km"
                return (this.resultOfConversion = (this.inputNumber * 1.60934).toFixed(2))
            } else if (this.inputOption === "pies2m" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "pies"
                this.unitChanged = "metros"
                return (this.resultOfConversion = (this.inputNumber * 0.3048).toFixed(2))
            } else if (this.inputOption === "m2pies" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "metros"
                this.unitChanged = "pies"
                return (this.resultOfConversion = (this.inputNumber * 3.28084).toFixed(2))
            } else if (this.inputOption === "cm2pul" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "centímetros"
                this.unitChanged = "pulgadas"
                return (this.resultOfConversion = (this.inputNumber * 0.393701).toFixed(2))
            } else if (this.inputOption === "pul2cm" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "pulgadas"
                this.unitChanged = "centímetros"
                return (this.resultOfConversion = (this.inputNumber * 2.54).toFixed(2))
            } else {
                this.resultOfConversion = 0
                this.unitChanged = ""
                return this.errorMsg = "!"
            }
        },
        addConversion() {
            if (!this.inputOption) return;
            this.savedConversions.push({ currentUnit: this.inputNumber, unit2change: this.unitToChange, convertedUnit: this.resultOfConversion, unitChanged: this.unitChanged });
            // Clean
            // this.inputOption = '';
            this.saveConversion();
        },
        removeSavedConversions(x) {
            this.savedConversions.splice(x, 1);
            this.saveConversion();
        },
        saveConversion() {
            let parsed = JSON.stringify(this.savedConversions);
            localStorage.setItem('savedConversions', parsed);
        },
        swapUnit() {
            if (this.inputOption === "km2mil") {
                this.inputOption = "mil2km"
                this.convert();
            } else if (this.inputOption === "mil2km") {
                this.inputOption = "km2mil"
                this.convert();
            } else if (this.inputOption === "pies2m") {
                this.inputOption = "m2pies"
                this.convert();
            } else if (this.inputOption === "m2pies") {
                this.inputOption = "pies2m"
                this.convert();
            } else if (this.inputOption === "cm2pul") {
                this.inputOption = "pul2cm"
                this.convert();
            } else if (this.inputOption === "pul2cm") {
                this.inputOption = "cm2pul"
                this.convert();
            } else {

            }
        }
    },
});

