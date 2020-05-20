var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLFloat = require('graphql').GraphQLFloat;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');
//var TextModel = require('../models/Text');
//var ImageModel = require('../models/Image');

var textType = new GraphQLObjectType({
    name: 'text',
    fields: function () {
        return {
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            }
        }
    }
});

var textTypeInput = new GraphQLInputObjectType({
    name: 'textInput',
    fields: function () {
        return {
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            }
        }
    }
});

var imageType = new GraphQLObjectType({
    name: 'image',
    fields: function () {
        return {
            url: {
                type: GraphQLString
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            }
        }
    }
});

var imageTypeInput = new GraphQLInputObjectType({
    name: 'imageInput',
    fields: function () {
        return {
            url: {
                type: GraphQLString
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            }
        }
    }
})

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            title: {
                type: GraphQLString
            },
            texts: {
                type: GraphQLList(textType)
            },
            images: {
                type: GraphQLList(imageType)
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            padding: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            width: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    texts: {
                        type: new GraphQLNonNull(GraphQLList(textTypeInput))
                    },
                    images: {
                        type: new GraphQLNonNull(GraphQLList(imageTypeInput))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    texts: {
                        type: new GraphQLNonNull(GraphQLList(textTypeInput))
                    },
                    images: {
                        type: new GraphQLNonNull(GraphQLList(imageTypeInput))
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { title: params.title, texts: params.texts, images: params.images, backgroundColor: params.backgroundColor, borderColor: params.borderColor, borderRadius: params.borderRadius, borderWidth: params.borderWidth, padding: params.padding, margin: params.margin, height: params.height, width: params.width, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });