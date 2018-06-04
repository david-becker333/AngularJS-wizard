(function () {
    'use strict';

    angular
        .module('migrationUtils')
        .service('MigrationService', MigrationService);

    /** @ngInject */
    function MigrationService(RestService) {

        this.findMigrationJobStatuses = function (filterParams) {

            return RestService.get("jobs", filterParams);
        };

        this.findMigrationJobStatusDetails = function (filterParams) {

            return RestService.get("jobdetails", filterParams);
        };

        this.findMigrationJobDetails = function (filterParams) {

            return RestService.get("migrationjobdetail", filterParams);
        };

        this.findNBAJobDetails = function (filterParams) {

            return RestService.get("nbajobdetail", filterParams);
        };

        this.cancelJob = function (filterParams) {

            return RestService.get("canceljob", filterParams);
        };

        this.findSourceMedia = function (filterParams) {

            return RestService.get("sourcemedia", filterParams);
        };

        this.findSourceDisk = function (filterParams) {

            return RestService.get("sourcedisk", filterParams);
        };

        this.findDestinationMedia = function (filterParams) {

            return RestService.get("destinationmedia", filterParams);
        };

        this.findDestinationDisk = function (filterParams) {

            return RestService.get("destinationdisk", filterParams);
        };

        this.saveMigrationJob = function (job) {

            return RestService.post("savemigrationjob", job);
        };

      
    }
})();



