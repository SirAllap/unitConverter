const app = new Vue({
    el: "#main-container",
    data: {
        conversions: [
            { unit: "Kilometer → Mile", fromUnit: "km", val: "km2mil" },
            { unit: "Mile → Kilometer", fromUnit: "miles", val: "mil2km" },
            { unit: "Foot → Meter", fromUnit: "foot", val: "pies2m" },
            { unit: "Meter → Foot", fromUnit: "meters", val: "m2pies" },
            { unit: "Centimeter → Inch", fromUnit: "cm", val: "cm2pul" },
            { unit: "Inch → Centimeter", fromUnit: "inch", val: "pul2cm" },
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
                this.unitChanged = "mi"
                return (this.resultOfConversion = (this.inputNumber * 0.6213711922).toFixed(2))
            } else if (this.inputOption === "mil2km" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "mi"
                this.unitChanged = "km"
                return (this.resultOfConversion = (this.inputNumber * 1.60934).toFixed(2))
            } else if (this.inputOption === "pies2m" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "ft"
                this.unitChanged = "m"
                return (this.resultOfConversion = (this.inputNumber * 0.3048).toFixed(2))
            } else if (this.inputOption === "m2pies" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "m"
                this.unitChanged = "ft"
                return (this.resultOfConversion = (this.inputNumber * 3.28084).toFixed(2))
            } else if (this.inputOption === "cm2pul" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "cm"
                this.unitChanged = "in"
                return (this.resultOfConversion = (this.inputNumber * 0.393701).toFixed(2))
            } else if (this.inputOption === "pul2cm" && this.inputNumber != 0) {
                this.errorMsg = ""
                this.unitToChange = "in"
                this.unitChanged = "cm"
                return (this.resultOfConversion = (this.inputNumber * 2.54).toFixed(2))
            } else {
                this.resultOfConversion = 0
                this.unitChanged = ""
                return this.errorMsg = "!"
            }
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
            } else {
                this.inputOption = "cm2pul"
                this.convert();
            }
        },
        addConversion() {
            if (!this.inputOption) return;
            this.savedConversions.push({ currentUnit: this.inputNumber, unit2change: this.unitToChange, convertedUnit: this.resultOfConversion, unitChanged: this.unitChanged });
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
    },
});

